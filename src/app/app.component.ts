import { Component, Inject, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { LoaderService } from './providers/loader.service';
import { TrackingService } from './providers/tracking.service';
import { FcmService } from './providers/fcm.service';
import { SessionData } from './models/active-packages';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    @Inject(NavController) private navCtrl: NavController,
    @Inject(SplashScreen) private splashScreen: SplashScreen,
    @Inject(StatusBar) private statusBar: StatusBar,
    @Inject(LoaderService) public loadingController: LoaderService,
    @Inject(Storage) private storage: Storage,
    @Inject(Location) private _location: Location,
    @Inject(Platform) private platform: Platform,
    @Inject(TrackingService) private trackService: TrackingService,
    @Inject(FcmService) private fcm: FcmService,
    @Inject(Network) private network: Network
   ){
  }
  register(){
try{
    this.trackService.demoregister().subscribe(data => {
      // tslint:disable-next-line: no-debugger
      //this.loadingController.presentToast('info', 'AfterDemoRegistering');
        if (data == null || data.Error === true)
        { 
          //this.loadingController.presentToast('info','inNULLData');
          this.gotoLogin();
          
        }
        if (data && data.ResponseData.AccessToken) {
         // this.loadingController.presentToast('info','InIf');
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('AuthToken', data.ResponseData.AccessToken.Token);
          localStorage.setItem('user', 'dummyUser');
          localStorage.setItem('expires', data.ResponseData.AccessToken.Expires);
          localStorage.setItem('IsLogin', 'true');
          this.initializeApp();
          this.trackService.setLatestPackages();
        }
        else {
          //this.loadingController.presentToast('info','inElse');
          this.trackService.logError(JSON.stringify(data),"Register Invalid response");
          this.gotoLogin();
        }
      },
      error => {
       // this.loadingController.presentToast('info', 'In Error:');
       this.trackService.logError(JSON.stringify(error),"Register");
        this.gotoLogin();
      });
    }catch(ex){
      this.loadingController.presentToast('info','Please check your network connection.');
      this.trackService.logError(JSON.stringify(ex),"Register");
      this.gotoLogin();
    }
  }
  ngOnInit() {
    try{
      
      this.storage.get('apiData').then(aData => {
        if (aData !== null && aData !== undefined) {
           SessionData.apiURL = aData.apiURL ; 
           SessionData.apiType = aData.apiType; 
          }});
          
if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.splashScreen.show();
        this.trackService.GenerateDeviceID();
        //this.fcm.FirebasenotificationSetup();
      let fixUserId =localStorage.getItem('AuthToken');
      if (fixUserId === null || fixUserId === undefined || fixUserId === '' || fixUserId === 'null'){
          this.register();
      }else{
          const exptime = new Date(localStorage.getItem('expires'));
          const curtime = new Date();
          if (curtime <= exptime){
            this.initializeApp();
            this.trackService.setLatestPackages();
          }else{
            this.register();
          }
      }
      localStorage.setItem('isScanned', 'false');
      });
    }else{
      this.register();
    }
    }catch(ex){
      this.trackService.logError(JSON.stringify(ex),"Register");
      this.gotoLogin();
    }
  }
  gotoLogin(){
    this.initializeApp();
    setTimeout(()=>{
      this.splashScreen.hide();  
    },7000);
    localStorage.setItem('AuthToken', null);
    localStorage.setItem('IsLogin', 'false');
    localStorage.setItem('user', null);
    localStorage.setItem('currPage', 'wp');
    this.navCtrl.navigateForward(`/login`);
  
  }
  initializeApp() {
    
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.styleLightContent();
    
     // this.platform.resume.subscribe(async () => {
        // const trackNo = localStorage.getItem('intent');
        // if (trackNo !== null && trackNo !== undefined && trackNo !== '') {
        //   //localStorage.setItem('currPage', 'tp');
        //   //this.navCtrl.navigateForward('/home');
        // }
     // });
     this.platform.backButton.subscribe(() => {
        if (this._location.isCurrentPathEqualTo('/home')) {
          navigator['app'].exitApp();
        } else{
          this._location.back();
        }
      });

      this.platform.pause.subscribe(async () => {
        localStorage.setItem('currPage', 'tp');
        this.navCtrl.navigateForward('/home');
      });
      if (this.platform.is('cordova')) {
      this.network.onDisconnect().subscribe(() =>
      {
        setTimeout(() =>
        {
          this.loadingController.presentToast('dark', 'Please check your Internet Conenction');
        }, 2000);
      });
      this.network.onConnect().subscribe(() =>
      {
        setTimeout(() =>
        {
          this.loadingController.presentToast('dark', 'Internet is Now Connected');
        }, 2000);
      });
      this.fcm.FirebasenotificationSetup();
      this.statusBar.styleDefault();
    
    }else{
      this.storage.set('deviceID', 'browser');
      
    }

  }
  setPushAlerts() {
    this.storage.get('deviceToken').then(devToken => {
      if (devToken === null || devToken === undefined || devToken === '' || devToken === 'null'){
        this.fcm.FirebasenotificationSetup();
      }});
    
    
  }
}
