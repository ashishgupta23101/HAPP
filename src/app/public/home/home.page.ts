import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IonSelect, NavController } from '@ionic/angular';
import { QueryParams } from 'src/app/models/QueryParams';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from '@ionic-native/barcode-scanner/ngx';
import { FilteringDates, SessionData } from 'src/app/models/active-packages';
import * as moment from 'moment';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/app/providers/tracking.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // tslint:disable-next-line: variable-name
  track_Form: FormGroup;
  loaderToShow: any;
  carrierCode: any = '';
  queryParam: QueryParams;
  encodeData: any;
  SCAC: any = '';
  scannedData: {};
  isCarrier = true;
  barcodeScannerOptions: BarcodeScannerOptions;
  trackNo = '';
  @ViewChild('carrierList') carrierSelectRef: IonSelect;
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(BarcodeScanner) private barcodeScanner: BarcodeScanner,
              @Inject(Router) private router: Router,
              @Inject(FormBuilder) public formBuilder: FormBuilder,
              @Inject(LoaderService) public loadingController: LoaderService,
              @Inject(TrackingService) private trackService: TrackingService,
              @Inject(NavController) private navCtrl: NavController) {

  }
  onSearchChange(searchValue: string): void {
    this.trackNo = searchValue;
    if (searchValue === 'SHIPMATRIX') {
      this.navCtrl.navigateForward(`/url-changer`);
    } else {
     // this.carCode = this.helper.GetCarrierCode(searchValue);
    }
  }

  gotoScanner() {
    this.navCtrl.navigateForward(`/barcode-scanner`);
  }
  // Phonegap Scanner
  scanPGCode() {
    this.barcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      disableAnimations: true
    };
    this.barcodeScanner
      .scan(this.barcodeScannerOptions)
      .then(barcodeData => {
        if (barcodeData !== null) {
          // alert(JSON.stringify(barcodeData));

          this.trackNo = barcodeData.text.replace('\u001d', '');

          this.GetCarrierByTNC(this.trackNo, true);
          // this.trackService.logError(JSON.stringify(barcodeData), 'Tracking No');
          //
        } else {
          this.loadingController.presentToast('Warning', 'No Data Available');
        }

        if (barcodeData.cancelled == true) {
          this.clearTrack();
        }

      })
      .catch(error => {
        this.clearTrack();
        this.trackService.logError(JSON.stringify(error), 'barcode Scan issue');
        this.loadingController.presentToast('Error', 'Something went wrong');
      });
  }
  // Phonegap Scanner
  CorrectTrackingNo(trackNo: string) {
    if ((trackNo.length > 20) && trackNo.substring(0, 3) == '420') {
        trackNo = trackNo.substring(8);
    }
    return trackNo;
  }
  ValidateTrackNo(trakNo: string)
  {
    if (trakNo.length > 3 && trakNo.substring(0, 3).toLowerCase() === 'tba')
    {
      this.loadingController.presentToast('Warning', 'Please track via amazon.');
      return false;
    }

    return true;
  }
  fillIntentValue() {
    this.trackNo = localStorage.getItem('intent');
    const cusHome = localStorage.getItem('cusHome');
    
    if (this.trackNo !== null && this.trackNo !== undefined && this.trackNo !== ''  && this.trackNo !== 'SHIPMATRIX') {
      this.loadingController.presentToast('intent',"Start tracking for : "+ this.trackNo);
      this.trackNo = this.trackNo.replace('\u001d', '');
      this.track_Form = this.formBuilder.group({
        TrackingNo: new FormControl(this.trackNo)
      });
      this.GetCarrierByTNC(this.trackNo);
      localStorage.setItem('intent', '');
      // alert('end' + this.trackNo);
    } else if (cusHome !== null && cusHome !== 'null' && cusHome !== undefined && cusHome !== ''  && cusHome === 'sp') {
      this.scanPGCode();
     }
    else {
      this.clearTrack();
    }
  }

  ngOnInit() {

    //this.googleSDK();
    this.clearTrack();
    const isLastScanned = localStorage.getItem('isScanned');
    if ( isLastScanned === 'true'){
      this.scanPGCode();
    }
  
    this.setfilteringDatestoSession();
    localStorage.setItem('isScanned', 'false');
  }
  ionViewDidEnter() {
    this.fillIntentValue();
  }
  fillCarrierCode(formVal) {
    this.GetCarrierByTNC(formVal.TrackingNo );
  }
  GetCarrierByTNC(TrackingNo, isScanned = false){
    if (TrackingNo === 'SHIPMATRIX') {
      this.navCtrl.navigateForward(`/url-changer`);
    } else {
    if (this.ValidateTrackNo(TrackingNo) === true && TrackingNo){
        // alert('1111');
        this.loadingController.present('Verifying Carrier....');
        TrackingNo = this.CorrectTrackingNo(TrackingNo);
        this.trackService.TNCapi(TrackingNo).subscribe(
          data => {
           // console.log('CarrierDetails' + JSON.stringify(data))
            this.carrierCode = data.ResponseData.Carrier;
            // this.carrierSelectRef.value = this.carrierCode;
            this.track_Form = this.formBuilder.group({
              TrackingNo: new FormControl(TrackingNo)
            });
            this.SCAC = data.ResponseData.SCAC;
            localStorage.setItem('SCAC', this.SCAC);
            if ( this.carrierCode === null || this.carrierCode === 'null' || this.carrierCode === '' || this.carrierCode === undefined ) {
              localStorage.setItem('SCAC', '');
              this.open_modal();
            }
            else{
              if (isScanned === true){
                localStorage.setItem('isScanned', 'true');
              }else{
                localStorage.setItem('isScanned', 'false');
              }
              this.doTrack(this.track_Form.value , this.carrierCode);
            }
            this.loadingController.dismiss();
        }, error => {
          this.carrierCode = '';
          this.track_Form = this.formBuilder.group({
            TrackingNo: new FormControl(TrackingNo)
          });

          this.loadingController.dismiss();
          this.loadingController.presentToast('Error', 'Carrier could not be determined.');
          this.open_modal();
          this.trackService.logError(JSON.stringify(error), 'fillCarrierCode');

        });
    }else{
      this.carrierCode = '';
      this.track_Form = this.formBuilder.group({
        TrackingNo: new FormControl(TrackingNo)
      });
    }
    }
  }
  open_modal( ) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          TrackingNo: JSON.stringify(this.trackNo),
          Carrier: JSON.stringify(this.carrierCode)
      }
      };
    this.router.navigate(['choose-carrier'], navigationExtras);
  }
  doTrack(value, ccode = 'NA') {
    try {
      localStorage.setItem('intent', '');
      this.carrierCode = ccode == 'NA' ? this.carrierSelectRef.value : ccode;
      this.queryParam = new QueryParams();
      this.queryParam.TrackingNo = value.TrackingNo;
      this.queryParam.Carrier = this.carrierCode;
      this.queryParam.Description = '';
      this.queryParam.Residential = 'true';
      this.carrierCode = '';
      this.trackService.getTrackingDetails(this.queryParam, 'pkgadded');
    } catch (Exception) {
      this.trackService.logError(JSON.stringify(Exception), 'doTrack-home');
      this.loadingController.presentToast('Error', JSON.stringify(Exception));
    }
  }
  clearTrack() {
    this.carrierCode = '';
    localStorage.setItem('SCAC', '');
    this.track_Form = this.formBuilder.group({
      TrackingNo: new FormControl('')
    });
    this.track_Form.reset(); }
  resInfoAlert() {
    this.loadingController.presentAlert('Info',
      // tslint:disable-next-line: max-line-length
      'Check the box to the right if your package will be delivered to a residence.Uncheck the box if your package will be delivered to commercial location.If unsure , leave the box checked.');
  }

  setfilteringDatestoSession() {
    // tslint:disable-next-line: variable-name
    let _filteringDates = new FilteringDates();
    _filteringDates.Today = new Date();
    _filteringDates.ThisWeek = this.trackService.getFirstLastDayOfWeek(new Date());
    _filteringDates.Yesterday = moment(_filteringDates.Today).subtract(1, 'days').toDate();
    const dateoflastweek = moment(_filteringDates.ThisWeek.firstDate).subtract(1, 'days').toDate();
    _filteringDates.LastWeek = this.trackService.getFirstLastDayOfWeek(dateoflastweek);
    _filteringDates.ThisMonth.firstDate = moment(new Date()).startOf('month').toDate();
    _filteringDates.ThisMonth.lastDate = moment(new Date()).toDate();
    _filteringDates.LastMonth.firstDate = moment(_filteringDates.ThisMonth.firstDate).subtract(1, 'days').startOf('month').toDate();
    _filteringDates.LastMonth.lastDate = moment(_filteringDates.LastMonth.firstDate).endOf('month').toDate();
    SessionData.filteringDates = _filteringDates;
  }
}
