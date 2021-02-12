import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Storage } from '@ionic/storage';
import { QueryParams } from 'src/app/models/QueryParams';
import { formatDate } from '@angular/common';
import { EditPackage } from 'src/app/models/EditPackage';
import { environment } from 'src/environments/environment';
import { ActivePackages, SessionData, Packages, CusDates, Report } from 'src/app/models/active-packages';
import { NavController} from '@ionic/angular';
import { LoaderService } from 'src/app/providers/loader.service';
import { Configuration } from 'src/app/models/configuration';
import { ErrorDetails } from 'src/app/models/error';
import { Device } from '@ionic-native/device/ngx';
import { __param } from 'tslib';
import { HelperService } from './helper.service';
import { EmailAccount } from '../models/Providers';
import { VendorAccount } from '../models/vendorAccount';
import { debug } from 'console';



@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  MarkDeliveredPackage(arg0: string, arg1: string) : Observable<any> {
    return this.http.get(SessionData.apiURL + environment.getAllVendors , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  deletePackage(arg0: string) : Observable<any> {
    debugger;
    const data = {
      DeviceId: this.uniqueDeviceID.uuid === null? 'browser':this.uniqueDeviceID.uuid,
      TrackingNo: arg0
    }
    let _token = localStorage.getItem('AuthToken');
    let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
    new HttpHeaders()
    .set('Content-Type', 'application/json'):
    new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+_token);
    return this.http.post(SessionData.apiURL + environment.deletePackage ,data, {
      headers: _header
    });
  }
  PackageSummary: Report = {
    labels : ['Delivered','Exceptions','LateDelivery','ShippingError','InTransit' ],
    data : [0,0,0,0,0],
    total : 0
    }
  SpendingSummary: Report = {
    labels : ['Electronics','Clothing','Grocery','PersonalCare','Entertainment','Other' ],
    data : [0,0,0,0,0,0],
    total : 0
    }
  PackagebyCarrier: Report = {
    labels : ['Amazon','UPS','FedEx','USPS','DHL','Other' ],
    data : [0,0,0,0,0,0],
    total : 0
  }
  ReportOTP: Report = {
    labels : ['Delivered','Return','InTransit' ],
    data : [0,0,0],
    total : 0
  }
  getAllVendors() : Observable<any> {
    return this.http.get(SessionData.apiURL + environment.getAllVendors , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  saveVendor(selectedVendors: VendorAccount) : Observable<any> {
    let _token = localStorage.getItem('AuthToken');
    let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
    new HttpHeaders()
    .set('Content-Type', 'application/json'):
    new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+_token);
    return this.http.post(SessionData.apiURL + environment.saveVendor , selectedVendors, {
      headers: _header
    });
  }
  getAllProviders(): Observable<any> {
    return this.http.get(SessionData.apiURL + environment.getAllProviders , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  saveEmailAccount(emailAccount: EmailAccount) : Observable<any> {
    let _token = localStorage.getItem('AuthToken');
    let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
    new HttpHeaders()
    .set('Content-Type', 'application/json'):
    new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+_token);
    return this.http.post(SessionData.apiURL + environment.saveEmailAccount , emailAccount, {
      headers: _header
    });
  }
// tslint:disable-next-line: variable-name

  private config: any;
  // tslint:disable-next-line: max-line-length
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(Device) private uniqueDeviceID: Device,
    @Inject(LoaderService) public loadingController: LoaderService,
    @Inject(Storage) private storage: Storage,
    @Inject(HelperService) private helper: HelperService,
    @Inject(NavController) private navCtrl: NavController) {
    }
    filterItems(items: any , searchTerm) {
      if (searchTerm === null || searchTerm === undefined || searchTerm === '') {
        return items;
      }
      return items.filter(item => {
         if (item.TrackingNo !== null && item.TrackingNo !== '') {
          return item.TrackingNo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
         }
      });
    }
    filterDatewise(items: any , searchDate: Date) {
      if (searchDate === null || searchDate === undefined) {
        return items;
      }
      return items.filter(item => {
        return formatDate(item.DateCreated, 'MM/dd/yyyy', 'en') === formatDate(new Date(searchDate), 'MM/dd/yyyy', 'en');
      });
    }
    filterWeekwise(items: any , range: any) {
      if (range === null || range === undefined) {
        return items;
      }
      return items.filter(item => {
       return ((new Date(item.DateCreated) >= new Date(range.firstDate)) && (new Date(item.DateCreated) <= new Date(range.lastDate)));
      });
    }
    /// get week day
    getFirstLastDayOfWeek(curr: Date) {
      const result  = new CusDates();
      const first = curr.getDate() - curr.getDay();  // First day is the day of the month - the day of the week
      const last = moment(curr).add((6 - curr.getDay()), 'days'); // last day is the first day + 6
      result.firstDate = new Date(curr.setDate(first));
      result.lastDate = last.toDate();
      return result;
    }
    /// get Tracking details for package
  getTrackingDetails(queryParam: QueryParams, nav: string = 'det') {

    this.storage.get('deviceID').then(id => {
      if (id !== '' && id !== null && id !== undefined ){
            queryParam.DeviceNo = id;
            this.loadingController.present('Tracking package....');
            this.trackPackages(queryParam).subscribe(data => {
            // tslint:disable-next-line: no-debugger
            if (data.Error === true) {
              console.log('Error = ' +  data.Message);
              this.loadingController.dismiss();
              this.loadingController.presentToast('Error', 'Invalid Response.');
              return false;
            }
            // Tracking Response
            this.storage.get('_activePackages').then(tData => {
                if (tData == null) {tData = []; }
                localStorage.setItem('SCAC', '');
                // tslint:disable-next-line: max-line-length
                const index = tData.findIndex(item => item.trackingNo === queryParam.TrackingNo.trim() + '-' + queryParam.Carrier.trim());
                if (index >= 0) {tData.splice(index, 1); }
                const record: any = data.objResponse;
                record.trackingNo = queryParam.TrackingNo.trim() + '-' + queryParam.Carrier.trim();
                record.ResultData.Description = queryParam.Description;
                record.ResultData.Residential = queryParam.Residential;
                tData.push(record);
                this.storage.set('_activePackages', tData);
                this.loadingController.dismiss();
                switch (nav) {
                  case 'pkgadded':
                    this.navCtrl.navigateForward(`/pkg-add-success/${record.trackingNo}`);
                    break;
                  case 'actpck':
                      this.navCtrl.navigateForward(`/listing`);
                      break;
                      case 'det':
                        this.navCtrl.navigateForward(`/list-detail/${record.trackingNo}`);
                        break;
                }
              });
          },
          error => {
            this.loadingController.dismiss();
            this.loadingController.presentToast('error', 'Could not be tracked by '+ this.helper.GetCarrierName(queryParam.Carrier));
            this.logError('Error - ' + JSON.stringify(error), 'Tracking');
          });
      } else {
        this.loadingController.presentToast('alert', 'Invalid Request');
      }
    });

  }

  getAllActivePackages(deviceid:any): Observable<any> {
    let params = new HttpParams().set('deviceId', deviceid);
    let _token = localStorage.getItem('AuthToken');
    let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
    new HttpHeaders()
    .set('Content-Type', 'application/json'):
    new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+_token);
    return this.http.get(SessionData.apiURL + environment.getAllPackages ,{
      params: params,
      headers: _header
    });
  }

  setLatestPackages(){
    debugger;
    this.storage.get('deviceID').then(id => {
      if (id !== '' && id !== null && id !== undefined ){
    this.getAllActivePackages(id).subscribe(data => {
      // tslint:disable-next-line: no-debugger
      data.ResponseData.forEach(element => {
       let itemKey = element.Trackingheader.TrackingNo.trim() + '-' + element.Trackingheader.CarrierCode.trim();
        this.storage.get('_activePackages').then(tData => {
            if (tData == null) {tData = []; }
            localStorage.setItem('SCAC', '');
            this.PackageSummary.total ++;
            this.PackagebyCarrier.total ++;
            // tslint:disable-next-line: max-line-length
            const index = tData.findIndex(item => item.trackingNo === itemKey);
            if (index >= 0) {tData.splice(index, 1); }
            const record: any = element;
            record.trackingNo = itemKey;
            record.ResultData.Description = element.Trackingheader.Description;
            record.ResultData.Residential = 'false';
            
            if(element.Trackingheader.CarrierCode === 'A'){
              this.PackagebyCarrier.data[0] ++;
            }
            else if(element.Trackingheader.CarrierCode === 'U'){
              this.PackagebyCarrier.data[1] ++;
            }
            else if(element.Trackingheader.CarrierCode === 'F' || element.Trackingheader.CarrierCode === 'R'){
              this.PackagebyCarrier.data[2] ++;
            }
            else if(element.Trackingheader.CarrierCode === 'S'){
              this.PackagebyCarrier.data[3] ++;
            }
            else if(element.Trackingheader.CarrierCode === 'D'){
              this.PackagebyCarrier.data[4] ++;
            }
            else {
              this.ReportOTP.data[1] ++;
            }
            if(element.ResultData.Status?.toLowerCase().includes('deliver')){
              this.PackageSummary.data[0] ++;
              this.ReportOTP.data[0] ++;
            }
            else if(element.ResultData.Status?.toLowerCase().includes('exception')){
              this.PackageSummary.data[1] ++;
            }
            else if(element.ResultData.Status?.toLowerCase().includes('late')){
              this.PackageSummary.data[2] ++;
            }
            else if(element.ResultData.Status?.toLowerCase().includes('manifest error')){
              this.PackageSummary.data[3] ++;
            }
            else if(element.ResultData.Status?.toLowerCase().includes('transit')){
              this.PackageSummary.data[4] ++;
              this.ReportOTP.data[2] ++;
            }
            else if(element.ResultData.Status?.toLowerCase().includes('return')){
              this.ReportOTP.data[1] ++;
            }
            tData.push(record);
            this.storage.set('_latePackages',tData)
            this.storage.set('_activePackages', tData);
          });
      });
    },
    error => {
      console.log(error);
    });
  } else {
    this.loadingController.presentToast('alert', 'Invalid Request');
  }
});
  }
     /// refresh for all package
   refreshTrackingDetails(arrayPackage: Array<ActivePackages>) {
    this.storage.get('deviceID').then(id => {
      if (id !== '' && id !== null && id !== undefined ){
    this.loadingController.presentToast('alert', 'Retracking active packages.');
    let isSuccess = 0;
    let i = 1;
    let isFailed = 0;
    //this.getAllActivePackages(id).subscribe(data => {
      // tslint:disable-next-line: no-debugger
      arrayPackage.forEach(element => {
      try {
        const queryParam = new QueryParams();
        queryParam.TrackingNo = element.TrackingNo;
        queryParam.Carrier = element.Carrier;
        queryParam.DeviceNo = id;
        queryParam.Description = '';
        queryParam.Residential = 'false';
        this.trackPackages(queryParam).subscribe(data => {
          // tslint:disable-next-line: no-debugger
          if (data.Error === true) {
            isFailed++;
            if (arrayPackage.length === i) {
              this.loadingController.presentToast('alert', 'Tracked Successfully : ' + isSuccess + ', Failed : ' + isFailed);
              this.navCtrl.navigateForward('/active-packages');
            } else { i++; }
          } else {
          // Tracking Response
          this.storage.get('_activePackages').then(tData => {
              if (tData == null) {tData = []; }
              // tslint:disable-next-line: max-line-length
              const index = tData.findIndex(item => item.trackingNo === queryParam.TrackingNo.trim() + '-' + queryParam.Carrier.trim());
              if (index >= 0) {tData.splice(index, 1); }
              const record: any = data.objResponse;
              record.trackingNo = queryParam.TrackingNo.trim() + '-' + queryParam.Carrier.trim();
              record.ResultData.Description = queryParam.Description;
              record.ResultData.Residential = queryParam.Residential;
              tData.push(record);
              this.storage.set('_activePackages', tData);
              isSuccess++;
              if (arrayPackage.length === i) {
                this.loadingController.presentToast('alert', 'Tracked Successfully : ' + isSuccess + ', Failed : ' + isFailed);
                this.navCtrl.navigateForward('/listing');
              } else { i++; }
            });
          }
        },
        error => {
          isFailed++;
          if (arrayPackage.length === i) {
            this.loadingController.presentToast('alert', 'Tracked Successfully : ' + isSuccess + ', Failed : ' + isFailed);
            this.navCtrl.navigateForward('/listing');
          }else{i++; }
        });
      } catch (exception) {
        isFailed++;
        if (arrayPackage.length === i) {
          this.loadingController.presentToast('alert', 'Tracked Successfully : ' + isSuccess + ', Failed : ' + isFailed);
          this.navCtrl.navigateForward(`/listing`);
        }else{i++; }
      }
      });
   // },
   // error => {
     
   // });
    } else {
      this.loadingController.presentToast('alert', 'Invalid Request');
    }
  });
}
// tslint:disable-next-line: variable-name
login(_email: string , _password: string): Observable<any> {
  const request = {Email: _email , Password: _password};
  return this.http.post(SessionData.apiURL + environment.login, request, {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
  });
}
getMessages(_token: string): Observable<any> {
  const url = environment.api_gmail+'messages?includeSpamTrash=true&maxResults='+environment.noOfMail+'&key='+environment.api_google_key;
  return this.http.get(url, {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+_token)
  });
}
getMessagebyId(_token: string, _id: string): Observable<any> {
  const url = environment.api_gmail+'messages/'+_id+'?key='+environment.api_google_key;
  return this.http.get(url, {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+_token)
  });
}
// tslint:disable-next-line: variable-name
register(_email: string , _password: string, _confirm: string): Observable<any> {
  const request = {Email: _email , Password: _password , ConfirmPassword: _confirm, DeviceId: this.uniqueDeviceID.uuid?this.uniqueDeviceID.uuid:'browser', AuthService: ''};
  return this.http.post(SessionData.apiURL + environment.register, request, {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
  });
}
  /// Edit package
  editPackageDetails(packageDetails: EditPackage): Observable<any> {
    return this.http.put(SessionData.apiURL + environment.savePreferances, packageDetails, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
    /// save Error
    logError(errormsg: string, errorLoc: string) {
      debugger;
      const errorData = new ErrorDetails();
      this.storage.get('deviceID').then(id => {
        if (id !== null && id !== undefined && id !== '') {
          errorData.DeviceId = id;
        } else {
          errorData.DeviceId = 'NA';
        }
        errorData.ErrorMessage = errormsg;
        errorData.ErrorLocation = errorLoc;
        this.saveError(errorData).subscribe(data => {}, error => {});
      }).catch(err => {
      errorData.DeviceId = 'NA';
      errorData.ErrorMessage = errormsg;
      errorData.ErrorLocation = errorLoc;
      this.saveError(errorData).subscribe(data => {}, error => {});
      }

      );

    }
    GenerateDeviceID()
    {
            this.storage.set('deviceID', this.uniqueDeviceID.uuid);
    }
    saveToken(){
      this.storage.get('deviceToken').then(devToken => {

        if (devToken !== null && devToken !== undefined && devToken !== ''){
         // alert('DeviceToken = ' + devToken);
          this.storage.get('deviceID').then(devID => {

            if (devID !== null && devID !== undefined && devID !== ''){
                   //  alert('DeviceID' + devID);
                      const gsmDetails = {
                        DeviceId: devID,
                        DeviceType: 'IOS',
                        DeviceToken: devToken,
                        RegistrationId: uuid()
                      };
                      this.saveDeviceID(gsmDetails).subscribe(data => {
                        if (data.Error){
                          this.logError('Error - ' + JSON.stringify(data.Message), 'saveDeviceID');
                        }
                      },
                      error => {
                        this.logError('Error - ' + JSON.stringify(error), 'saveDeviceID');
                      });
                    } else {
                      this.logError('Error - No device ID', 'saveDeviceID');
                      return;
                    }
                });
        } else {
          this.logError('Error - No device token', 'saveDeviceID');
          return;
        }
    });
    }
    saveError(errorData: ErrorDetails): Observable<any> {
      return this.http.put(SessionData.apiURL + environment.logErrorMessage , errorData, {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
      });
    }
    // Get TNC API
    TNCapi(trackingNo: string): Observable<any> {
      const request = {TrackingNo: trackingNo};
      return this.http.post(SessionData.apiURL + environment.tncApi , request, {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
      });
    }
   /// save Device Configuration
   saveDeviceConfiguration(configDetails: Configuration): Observable<any> {
    return this.http.put(SessionData.apiURL + environment.saveConfiguration, configDetails, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  /// Save device id
  saveDeviceID(gsmDetails: any): Observable<any> {
    return this.http.put(SessionData.apiURL + environment.saveDeviceID, gsmDetails, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  /// track package
  // tslint:disable-next-line: variable-name
  private trackPackages(_queryParam: QueryParams): Observable<any> {
    try {
    let trackingAPI = environment.trackingAPI;
    let SCAC = localStorage.getItem('SCAC');
    if ( SCAC === null || SCAC === 'null' || SCAC === '' || SCAC === undefined ) {
      switch (_queryParam.Carrier)
      {
        case 'C':
        SCAC = 'CNPR';
        _queryParam.Carrier = 'X';
        break;
        case 'L':
        SCAC = 'LSOM';
        _queryParam.Carrier = 'X';
        break;
        case 'U':
          SCAC = 'UPSN';
          break;
        case 'S':
          SCAC = 'USPS';
          break;
        case 'F':
          SCAC = 'FDE';
          break;
        case 'D':
          SCAC = 'DHL';
          break;
        case 'P':
        SCAC = 'PLTR';
        break;
        case 'O':
        SCAC = 'ONTR';
        break;
      }
    }

    trackingAPI = trackingAPI.replace('@TrackingNo', _queryParam.TrackingNo);
    trackingAPI = trackingAPI.replace('@SCAC', SCAC);
    trackingAPI = trackingAPI.replace('@Carrier', _queryParam.Carrier);
    // tslint:disable-next-line: max-line-length
    trackingAPI = trackingAPI.replace('@Residential', _queryParam.Residential === null || _queryParam.Residential === '' || _queryParam.Residential === undefined ? 'false' : _queryParam.Residential );
    // tslint:disable-next-line: max-line-length
    trackingAPI = trackingAPI.replace('@Description', _queryParam.Description === null || _queryParam.Description === undefined ? '' : _queryParam.Description );
    trackingAPI = trackingAPI.replace('@DeviceNo', _queryParam.DeviceNo);
    trackingAPI = trackingAPI.replace('@RegistrationId', uuid());
    return this.http.post(SessionData.apiURL + trackingAPI, null, {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
  });
  }
  catch (exc) {
    this.loadingController.presentToast('dark', 'Error: ' + exc);
    return null;
  }
}
/// set active package data in sessions
  setPackagestoSession(tData: any) {
    SessionData.packages = new  Packages();
    let pack: ActivePackages;
    tData.forEach(element => {
      pack = new ActivePackages();
      pack.TrackingNo = element.Trackingheader.TrackingNo;
      pack.ProductName = element.Trackingheader.TrackingNo;
      pack.ProductUrl = '../../../assets/images/default-product-image.png';
      pack.Status = element.ResultData.Status === '' || element.ResultData.Status === null ? 'NA' : element.ResultData.Status;
      pack.Carrier = element.Trackingheader.CarrierCode;
      pack.DateCreated = element.ResultData.Created === '' || element.ResultData.Created === null ? 'NA' : element.ResultData.Created;
      pack.ExpectedDate = element.Trackingheader.EstDeliveryDate === ''
       || element.ResultData.EstDeliveryDate === null ? 'NA' : element.Trackingheader.EstDeliveryDate;
      pack.LastUpdated = element.ResultData.Updated === '' || element.ResultData.Updated === null ? 'NA' : element.ResultData.Updated;
      pack.Key = element.trackingNo;
      pack.ImgUrl = pack.Status.toLowerCase().includes('delivered') ? '../../../assets/slicing/deliveredontime.png' :
                 (pack.Status.toLowerCase().includes('transit') ? '../../../assets/slicing/intransit.png' :
                 (pack.Status.toLowerCase().includes('invalid') ? '../../../assets/slicing/exception.png' :
                 '../../../assets/slicing/deliveredlate.png'));
      SessionData.packages.All.push(pack);
    });
    SessionData.packages.Today = this.filterDatewise(SessionData.packages.All, SessionData.filteringDates.Today);
    SessionData.packages.Yesterday = this.filterDatewise(SessionData.packages.All, SessionData.filteringDates.Yesterday);
    SessionData.packages.ThisWeek = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.ThisWeek);
    SessionData.packages.LastWeek = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.LastWeek);
    SessionData.packages.ThisMonth = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.ThisMonth);
    SessionData.packages.LastMonth = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.LastMonth);
  }
/// set archive package data in sessions
setarchivePackagestoSession(tData: any) {
  SessionData.packages = new  Packages();
  let pack: ActivePackages;
  tData.forEach(element => {
    pack = new ActivePackages();
    pack.TrackingNo = element.Trackingheader.TrackingNo;
    pack.ProductName = element.Trackingheader.TrackingNo;
    pack.ProductUrl = '../../../assets/images/default-product-image.png';
    pack.Status = element.ResultData.Status === '' || element.ResultData.Status === null ? 'NA' : element.ResultData.Status;
    pack.Carrier = element.Trackingheader.CarrierCode;
    pack.DateCreated = element.ResultData.Created === '' || element.ResultData.Created === null ? 'NA' : element.ResultData.Created;
    pack.ExpectedDate = element.Trackingheader.EstDeliveryDate === ''
     || element.ResultData.EstDeliveryDate === null ? 'NA' : element.Trackingheader.EstDeliveryDate;
    pack.LastUpdated = element.ResultData.Updated === '' || element.ResultData.Updated === null ? 'NA' : element.ResultData.Updated;
    pack.Key = element.trackingNo;
    pack.ImgUrl = pack.Status.toLowerCase().includes('delivered') ? '../../../assets/slicing/deliveredontime.png' :
    (pack.Status.toLowerCase().includes('transit') ? '../../../assets/slicing/intransit.png' :
    (pack.Status.toLowerCase().includes('invalid') ? '../../../assets/slicing/exception.png' :
    '../../../assets/slicing/deliveredlate.png'));
    SessionData.packages.All.push(pack);
  });
  SessionData.packages.Today = this.filterDatewise(SessionData.packages.All, SessionData.filteringDates.Today);
  SessionData.packages.Yesterday = this.filterDatewise(SessionData.packages.All, SessionData.filteringDates.Yesterday);
  SessionData.packages.ThisWeek = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.ThisWeek);
  SessionData.packages.LastWeek = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.LastWeek);
  SessionData.packages.ThisMonth = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.ThisMonth);
  SessionData.packages.LastMonth = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.LastMonth);

}


    
  /// Save device id
 
}
