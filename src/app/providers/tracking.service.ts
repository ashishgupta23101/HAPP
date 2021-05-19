import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Storage } from '@ionic/storage';
import { QueryParams } from 'src/app/models/QueryParams';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ActivePackages, SessionData, Packages, CusDates, Report } from 'src/app/models/active-packages';
import { NavController, Platform} from '@ionic/angular';
import { LoaderService } from 'src/app/providers/loader.service';
import { Configuration } from 'src/app/models/configuration';
import { ErrorDetails } from 'src/app/models/error';
import { Device } from '@ionic-native/device/ngx';
import { __param } from 'tslib';
import { HelperService } from './helper.service';
import { EmailAccount } from '../models/Providers';
import { VendorAccount } from '../models/vendorAccount';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class TrackingService {

archivePackage(arg0: string,arg1:string,arg2:boolean)  : Observable<any> {
  const data = {
    TrackingNo: arg0,
    Carrier:arg1,
    Undo:arg2
  }
  let _token = localStorage.getItem('AuthToken');
  let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
  new HttpHeaders()
  .set('Content-Type', 'application/json'):
  new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer '+_token);
  return this.http.post(SessionData.apiURL + environment.archivePackage ,data, {
    headers: _header
  });
}

MarkDeliveredPackage(arg0: string, arg1: string) : Observable<any> {
  return this.http.get(SessionData.apiURL + environment.getAllVendors , {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
  });
}
deletePackage(arg0: string,arg1:string)  : Observable<any> {
  const data = {
    TrackingNo: arg0,
    Carrier:arg1
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
spendingSummary()  : Observable<any> {
  let _token = localStorage.getItem('AuthToken');
  let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
  new HttpHeaders()
  .set('Content-Type', 'application/json'):
  new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer '+_token);
  return this.http.get(SessionData.apiURL + environment.spendingSummary ,{
    headers: _header
  });
}
devid : any = 'browser';
allData : Array<any>;
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

  let _token = localStorage.getItem('AuthToken');
  let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
  new HttpHeaders()
  .set('Content-Type', 'application/json'):
  new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer '+_token);
  return this.http.get(SessionData.apiURL + environment.getAllVendors , {
    headers: _header
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
  let _token = localStorage.getItem('AuthToken');
  let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
  new HttpHeaders()
  .set('Content-Type', 'application/json'):
  new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer '+_token);
  return this.http.get(SessionData.apiURL + environment.getAllProviders , {
    headers: _header
  });
}
refreshToken(email:string): Observable<any> {
  let _params = new HttpParams().set("username",email);
  let _header =  new HttpHeaders()
  .set('Content-Type', 'application/json')
  return this.http.get(SessionData.apiURL + environment.refreshToken , {
    headers: _header,
    params: _params
  });
}
saveSupport(postData:any): Observable<any> {
  let _header =  new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post(SessionData.apiURL + environment.saveSupport,postData , {
    headers: _header
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
DelEmailAccount(proCode: string) : Observable<any> {
  let _token = localStorage.getItem('AuthToken');
  let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
  new HttpHeaders()
  .set('Content-Type', 'application/json'):
  new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer '+_token);
  return this.http.post(SessionData.apiURL + environment.delEmailAccount+'/'+ proCode,null, {
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
  @Inject(Platform) private platform: Platform,
  @Inject(HelperService) private helper: HelperService,
  @Inject(SplashScreen) private splashScreen: SplashScreen,
  @Inject(Router) private router: Router,
  @Inject(NavController) private navCtrl: NavController) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.devid = this.uniqueDeviceID.uuid;
      }else{
        this.devid = 'browser';
      }
      this.GenerateDeviceID();
    });
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
  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}
  /// get Tracking details for package
getTrackingDetails(queryParam: QueryParams, nav: string = 'det') {

          queryParam.DeviceNo = this.devid;
          this.loadingController.present('Tracking package....');
          this.trackPackages(queryParam).subscribe(data => {
          // tslint:disable-next-line: no-debugger
          if (data.Error === true) {
            this.logError('Error - ' + JSON.stringify(data.Message), 'getTrackingDetails');
            this.loadingController.dismiss();
            this.loadingController.presentToast('Error', 'Invalid Response.');
            return false;
          }
          // Tracking Response
          this.storage.get('_allPackages').then(tData => {
              if (tData == null) {tData = []; }
              localStorage.setItem('SCAC', '');
              // tslint:disable-next-line: max-line-length
              const index = tData.findIndex(item => item.trackingNo === queryParam.TrackingNo.trim() + '-' + queryParam.Carrier.trim());
              if (index >= 0) {
                tData.splice(index, 1);
              }
              const record: any = data.objResponse;
              record.trackingNo = queryParam.TrackingNo.trim() + '-' + queryParam.Carrier.trim();
              record.ResultData.Description = queryParam.Description;
              record.ResultData.Residential = queryParam.Residential;
              record.type = 'act';
              tData.push(record);
              this.storage.set('_allPackages', tData);
              let pack = new ActivePackages();
              pack.TrackingNo = record.ResultData.TrackingNo;
              pack.VendorName = record.ResultData.VendorName;
              pack.ProductName = record.LineItems[0].ProductName;
              pack.ProductUrl = record.LineItems[0].ProductImageURL;
              pack.Category = record.LineItems[0].Category;
              pack.Status = record.ResultData.Status === '' || record.ResultData.Status === null ? 'NA' : record.ResultData.Status;
              pack.Carrier = record.ResultData.CarrierCode;
              pack.DateCreated = record.ResultData.DateShipped === '' || record.ResultData.DateShipped === null ? 'NA' : record.ResultData.DateShipped;
              if(pack.Status.toLowerCase().includes('deliver')){
                pack.ExpectedDate = record.ResultData.DateDelivered === ''
                || record.ResultData.DateDelivered === null ? 'NA' : record.ResultData.DateDelivered;
              
              }else{
                pack.ExpectedDate = record.ResultData.EstDeliveryDate === ''
                || record.ResultData.EstDeliveryDate === null ? 'NA' : record.ResultData.EstDeliveryDate;
              }

              
              pack.LastUpdated = record.ResultData.Updated === '' || record.ResultData.Updated === null ? 'NA' : record.ResultData.Updated;
              pack.Key = record.trackingNo;
              pack.ImgUrl = pack.Status.toLowerCase().includes('delivered') ? '../../../assets/slicing/deliveredontime.png' :
              (pack.Status.toLowerCase().includes('transit') ? '../../../assets/slicing/intransit.png' :
              (pack.Status.toLowerCase().includes('invalid') ? '../../../assets/slicing/exception.png' :
              '../../../assets/slicing/deliveredlate.png'));
              let scans = record != undefined && record.scans != null ? record.scans : [];
              this.loadingController.dismiss();
              switch (nav) {
                case 'pkgadded':
                  this.gotoDetail(pack,scans);
                  break;
                case 'actpck':
                    this.navCtrl.navigateForward(`/listing`);
                    break;
                    case 'det':
                      this.gotoDetail(pack,scans);
                      break;
              }
              // this.getReportsData();
          });
        },
        error => {
          this.loadingController.dismiss();
          this.loadingController.presentToast('error', 'Could not be tracked by '+ this.helper.GetCarrierName(queryParam.Carrier));
          this.logError('Error - ' + JSON.stringify(error), 'Tracking');
        });
}
gotoDetail(item:any,scans:any){
  const navigationExtras: NavigationExtras = {
    queryParams: {
        scans: JSON.stringify(scans),
        item: JSON.stringify(item)
    }
    };
    this.router.navigate(['pkg-add-success'], navigationExtras);
}
  getAllActivePackages(): Observable<any> {
  let _token = localStorage.getItem('AuthToken');
  let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
  new HttpHeaders()
  .set('Content-Type', 'application/json'):
  new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer '+_token);
  return this.http.get(SessionData.apiURL + environment.getAllPackages ,{
    headers: _header
  });
}

setLatestPackages(){
  this.storage.set('_allPackages', []);
  this.allData = [];
  this.getAllActivePackages().subscribe(data => {
    // tslint:disable-next-line: no-debugger
    data.objResponse.forEach(element => {
      let itemKey = element.ResultData.TrackingNo?.trim() + '-' + element.ResultData.CarrierCode?.trim();
      const record: any = element;
      if(element.ResultData.Archived === true || element.ResultData.Archived === 'true' ){
          record.trackingNo = itemKey;
          record.ResultData.Description = element.ResultData.Description;
          record.ResultData.Residential = 'false';
          record.type = 'arc';
      }else{
          record.trackingNo = itemKey;
          record.ResultData.Description = element.ResultData.Description;
          record.ResultData.Residential = 'false';
          record.type = 'act';
      }
      this.allData.push(record);
    });
    this.storage.set('_allPackages', this.allData);
    this.gotocustomePAGE();
  },error => { 
    this.gotocustomePAGE();
    this.logError('Error - ' + JSON.stringify(error), 'getAllActivePackage()');
  });
}
gotocustomePAGE(){
  let cusHome = localStorage.getItem('cusHome');
  if (cusHome === null || cusHome === 'null' || cusHome === undefined || cusHome === '') {
    localStorage.setItem('cusHome', 'tp');
  }
  this.loadingController.dismiss();
  switch (cusHome) {
    case 'tp':
    case 'sp':
        localStorage.setItem('currPage', 'tp');
        this.navCtrl.navigateForward(`/home`);
    break;
    case 'ap':
    case 'hp':
      localStorage.setItem('currPage', 'lp');
        this.navCtrl.navigateForward(`/listing`);
    break;
    case 'gr':
      localStorage.setItem('currPage', 'rp');
        this.navCtrl.navigateForward(`/splash`);
    break;
    default:
      localStorage.setItem('currPage', 'tp');
        this.navCtrl.navigateForward(`/home`);
    break;
  }
}
getReportsData(){
  debugger;
  this.spendingSummary().subscribe(data =>{
    if(data.Error === false && data.ResponseData.Total > 0){
      this.SpendingSummary = data.ResponseData;
    }
  },error => {
   this.logError(JSON.stringify(error),'getReportsData');
  });
  this.storage.get('_allPackages').then(tData => {
     if (tData == null) {
      tData = [];
      return;
      }
      this.PackageSummary.total = 0;
      this.SpendingSummary.total = 0;
      this.PackagebyCarrier.total = 0;
      this.ReportOTP.total = 0;
      this.PackageSummary.data = [0,0,0,0,0];
      this.SpendingSummary.data = [0,0,0,0,0,0];
      this.PackagebyCarrier.data = [0,0,0,0,0,0];
      this.ReportOTP.data = [0,0,0];
      tData.forEach(element => {
      this.setreport(element);
      });
      this.ReportOTP.total = this.ReportOTP.data[0] + this.ReportOTP.data[1] + this.ReportOTP.data[2];
  });
}

setreport(element: any){
  this.PackageSummary.total ++;
  this.PackagebyCarrier.total ++;
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
  if(element.ResultData.Status?.toLowerCase().includes('delivered')){
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
}
    /// refresh for all package
  refreshTrackingDetails(arrayPackage: Array<ActivePackages>) {

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
      queryParam.DeviceNo = this.devid;
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
        this.storage.get('_allPackages').then(tData => {
            if (tData == null) {tData = []; }
            // tslint:disable-next-line: max-line-length
            const index = tData.findIndex(item => item.trackingNo === queryParam.TrackingNo.trim() + '-' + queryParam.Carrier.trim());
            if (index >= 0) {tData.splice(index, 1); }
            const record: any = data.objResponse;
            record.trackingNo = queryParam.TrackingNo.trim() + '-' + queryParam.Carrier.trim();
            record.ResultData.Description = queryParam.Description;
            record.ResultData.Residential = queryParam.Residential;
            record.type = 'act';
            tData.push(record);
            this.storage.set('_allPackages', tData);
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

demoregister(): Observable<any> {
const request = {DeviceId: this.devid};
return this.http.post(SessionData.apiURL + environment.deviceLogin, request, {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
});

}
// tslint:disable-next-line: variable-name
register(_email: string , _password: string, _confirm: string): Observable<any> {
const request = {Email: _email , Password: _password , ConfirmPassword: _confirm,AuthService: ''};
return this.http.post(SessionData.apiURL + environment.register, request, {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
});
}

/// save Error
logError(errormsg: string, errorLoc: string) {
  const errorData = new ErrorDetails();
  errorData.DeviceId = this.devid;
  errorData.ErrorMessage = errormsg;
  errorData.ErrorLocation = errorLoc;
  this.saveError(errorData).subscribe(data => {}, error => {});
}
GenerateDeviceID()
{
if(this.devid === undefined || this.devid === null || this.devid === '' ){
  this.storage.set('deviceID', 'browser' );
}else{
  this.storage.set('deviceID', this.devid );
}

}
saveToken(devToken){
const gsmDetails = {
  DeviceId: this.devid,
  DeviceType: 'IOS',
  DeviceToken: devToken
};
this.saveDeviceID(gsmDetails).subscribe(data => {
    //this.logError('Device Data - ' + JSON.stringify(data), 'saveDeviceID');
},
error => {
  this.logError('Error - ' + JSON.stringify(error), 'saveDeviceID');
});
}
saveError(errorData: ErrorDetails): Observable<any> {
return this.http.post(SessionData.apiURL + environment.logErrorMessage , errorData, {
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
let _token = localStorage.getItem('AuthToken');
let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
new HttpHeaders()
.set('Content-Type', 'application/json'):
new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Authorization', 'Bearer '+_token);
return this.http.post(SessionData.apiURL + environment.saveConfiguration, configDetails, {
headers: _header
});
}
/// Save device id
saveDeviceID(gsmDetails: any): Observable<any> { 
let _token = localStorage.getItem('AuthToken');
let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
new HttpHeaders()
.set('Content-Type', 'application/json'):
new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Authorization', 'Bearer '+_token);
return this.http.post(SessionData.apiURL + environment.saveDeviceID, gsmDetails, {
headers: _header
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
let _token = localStorage.getItem('AuthToken');
let _header =  (_token === null || _token === 'null' || _token === undefined || _token === '') ?
new HttpHeaders()
.set('Content-Type', 'application/json'):
new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Authorization', 'Bearer '+_token);
return this.http.post(SessionData.apiURL + trackingAPI, null, {
headers: _header
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
    //alert(element.type);
    element.LineItems.forEach(item => {
    pack = new ActivePackages();
    pack.TrackingNo = element.ResultData.TrackingNo;
    pack.VendorName = element.ResultData.VendorName;
    pack.ProductName = item.ProductName;
    pack.ProductUrl = item.ProductImageURL;
    pack.Category = item.Category;
    pack.Status = element.ResultData.Status === '' || element.ResultData.Status === null ? 'NA' : element.ResultData.Status;
    pack.Carrier = element.ResultData.CarrierCode;
    pack.DateCreated = element.ResultData.DateShipped === '' || element.ResultData.DateShipped === null ? 'NA' : element.ResultData.DateShipped;
    if(pack.Status.toLowerCase().includes('deliver')){
      pack.ExpectedDate = element.ResultData.DateDelivered === ''
      || element.ResultData.DateDelivered === null ? 'NA' : element.ResultData.DateDelivered;
     
    }else{
      pack.ExpectedDate = element.ResultData.EstDeliveryDate === ''
      || element.ResultData.EstDeliveryDate === null ? 'NA' : element.ResultData.EstDeliveryDate;
    }

    
    pack.LastUpdated = element.ResultData.Updated === '' || element.ResultData.Updated === null ? 'NA' : element.ResultData.Updated;
    pack.Key = element.trackingNo;
    pack.ImgUrl = pack.Status.toLowerCase().includes('delivered') ? '../../../assets/slicing/deliveredontime.png' :
    (pack.Status.toLowerCase().includes('transit') ? '../../../assets/slicing/intransit.png' :
    (pack.Status.toLowerCase().includes('invalid') ? '../../../assets/slicing/exception.png' :
    '../../../assets/slicing/deliveredlate.png'));
    SessionData.packages.All.push(pack);
    });
  });
  SessionData.packages.Today = this.filterDatewise(SessionData.packages.All, SessionData.filteringDates.Today);
  SessionData.packages.Yesterday = this.filterDatewise(SessionData.packages.All, SessionData.filteringDates.Yesterday);
  SessionData.packages.ThisWeek = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.ThisWeek);
  SessionData.packages.LastWeek = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.LastWeek);
  SessionData.packages.ThisMonth = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.ThisMonth);
  SessionData.packages.LastMonth = this.filterWeekwise(SessionData.packages.All, SessionData.filteringDates.LastMonth);
}

}
