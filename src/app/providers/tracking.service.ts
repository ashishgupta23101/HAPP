import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Storage } from '@ionic/storage';
import { QueryParams } from 'src/app/models/QueryParams';
import { formatDate } from '@angular/common';
import { EditPackage } from 'src/app/models/EditPackage';
import { environment } from 'src/environments/environment';
import { ActivePackages, SessionData, Packages } from 'src/app/models/active-packages';
import { NavController} from '@ionic/angular';
import { LoaderService } from 'src/app/providers/loader.service';
import { Configuration } from 'src/app/models/configuration';
import { ErrorDetails } from 'src/app/models/error';
import { Device } from '@ionic-native/device/ngx';



@Injectable({
  providedIn: 'root'
})
export class TrackingService {
// tslint:disable-next-line: variable-name

  private config: any;
  // tslint:disable-next-line: max-line-length
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(Device) private uniqueDeviceID: Device,
    @Inject(LoaderService) public loadingController: LoaderService,
    @Inject(Storage) private storage: Storage,
    @Inject(NavController) private navCtrl: NavController) {
    }
    filterItems(items: any , searchTerm) {
      return items.filter(item => {
         if (item.TrackingNo !== null && item.TrackingNo !== '') {
          return item.TrackingNo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
         }
      });
    }
    filterDatewise(items: any , searchDate: Date) {
      return items.filter(item => {
        return formatDate(item.DateCreated, 'MM/dd/yyyy', 'en') === formatDate(new Date(searchDate), 'MM/dd/yyyy', 'en');
      });
    }
    filterWeekwise(items: any , range: any) {
      return items.filter(item => {
       return ((new Date(item.DateCreated) >= new Date(range.firstDate)) && (new Date(item.DateCreated) <= new Date(range.lastDate)));
      });
    }
    /// get week day
    getFirstLastDayOfWeek(curr: Date) {
      let result = {};
      const first = curr.getDate() - curr.getDay();  // First day is the day of the month - the day of the week
      const last = moment(curr).add((6 - curr.getDay()), 'days'); // last day is the first day + 6
      result = {
            firstDate: new Date(curr.setDate(first)),
        lastDate: last.toDate()
      };
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
                localStorage.setItem('SCAC','');
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
                    this.navCtrl.navigateForward(`/pkg-add-success`);
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
            this.loadingController.presentToast('error', 'Error while Tracking.');
            this.logError('Error - ' + JSON.stringify(error), 'Tracking');
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
    } else {
      this.loadingController.presentToast('alert', 'Invalid Request');
    }
  });
}
login(_email: string , _password: string): Observable<any> {
  let request = {email: _email , password: _password};
  return this.http.put(SessionData.apiURL + environment.login, request, {
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
      const request = {'TrackingNo': trackingNo};
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
      pack.Status = element.Trackingheader.Status === '' || element.Trackingheader.Status === null ? 'NA' : element.Trackingheader.Status;
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
    pack.Status = element.Trackingheader.Status === '' || element.Trackingheader.Status === null ? 'NA' : element.Trackingheader.Status;
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

}

}
