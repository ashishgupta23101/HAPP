import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { QueryParams } from 'src/app/models/QueryParams';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-choose-carrier',
  templateUrl: './choose-carrier.page.html',
  styleUrls: ['./choose-carrier.page.scss'],
})
export class ChooseCarrierPage implements OnInit {
  // tslint:disable-next-line: variable-name
  track_Form: FormGroup;
  carrier = '';
  trackingNo = '';
  carrierCode: any = '';
  queryParam: QueryParams;
  constructor(
    @Inject(ModalController) private modalController: ModalController,
    @Inject(LoaderService) public loadingController: LoaderService,
    @Inject(FormBuilder) public formBuilder: FormBuilder, 
    @Inject(NavController) private navCtrl: NavController,
    @Inject(TrackingService) private trackService: TrackingService,
    @Inject(ActivatedRoute) private route: ActivatedRoute) {
      
  }
  doTrack(value) {
    try {
      this.queryParam = new QueryParams();
      this.queryParam.TrackingNo = this.trackingNo;
      this.queryParam.Carrier = value.Carrier;
      this.queryParam.Description = '';
      this.queryParam.Residential = 'true';
      this.trackService.getTrackingDetails(this.queryParam,'pkgadded');
    } catch (Exception) {
      this.trackService.logError(JSON.stringify(Exception), 'doTrack-home');
      this.loadingController.presentToast('Error', JSON.stringify(Exception));
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.trackingNo = JSON.parse(params.TrackingNo);
      this.carrier = JSON.parse(params.Carrier);
    });
    this.track_Form = this.formBuilder.group({
      Carrier: new FormControl(''),
      Optional: new FormControl('')
    });
  }

  dismiss() {
    this.navCtrl.back();
  }

}
