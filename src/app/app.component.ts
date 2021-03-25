import { Component, Inject, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { LoaderService } from './providers/loader.service';
import { TrackingService } from './providers/tracking.service';
import { FcmService } from './providers/fcm.service';
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
    @Inject(Platform) private platform: Platform,
    @Inject(TrackingService) private trackService: TrackingService,
    @Inject(FcmService) private fcm: FcmService,
    @Inject(Network) private network: Network
   ){
    this.platform.ready().then(() => {
    let fixUserId =localStorage.getItem('AuthToken');
    if (fixUserId === null || fixUserId === undefined || fixUserId === '' || fixUserId === 'null'){
        this.register();
    }else{
      this.initializeApp();
      this.trackService.setLatestPackages();
    }
    localStorage.setItem('isScanned', 'false');
   }).catch(() => {
    this.splashScreen.hide();
  });

  }
  register(){
    this.trackService.demoregister().subscribe(data => {
      // tslint:disable-next-line: no-debugger
      this.fcm.notificationSetup();
        if (data.Error === true)
        { 
          localStorage.setItem('AuthToken', null);
          localStorage.setItem('IsLogin', 'false');
          localStorage.setItem('user', null);
          this.loadingController.presentToast('info','unable to login');
          this.initializeApp();
          localStorage.setItem('currPage', 'rp');
          this.navCtrl.navigateForward(`/login`);
          this.splashScreen.hide();
          
        }
        if (data && data.ResponseData.AccessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('AuthToken', data.ResponseData.AccessToken.Token);
          localStorage.setItem('user', 'dummyUser');
          localStorage.setItem('expires', data.ResponseData.AccessToken.Expires);
          localStorage.setItem('IsLogin', 'true');
          this.initializeApp();
          this.trackService.setLatestPackages();
         
        }
        else {
          this.initializeApp();
          localStorage.setItem('AuthToken', null);
          localStorage.setItem('IsLogin', 'false');
          localStorage.setItem('user', null);
          this.loadingController.presentToast('info','unable to login');
          localStorage.setItem('currPage', 'rp');
          this.navCtrl.navigateForward(`/login`);
          this.splashScreen.hide();
        }
    },
    error => {
      localStorage.setItem('AuthToken', null);
      localStorage.setItem('IsLogin', 'false');
      localStorage.setItem('user', null);
      this.initializeApp();
      localStorage.setItem('currPage', 'rp');
      this.navCtrl.navigateForward(`/login`);
      this.splashScreen.hide();
     this.loadingController.presentToast('info','unable to login');
    });
  }
  ngOnInit() {
  
  }
  initializeApp() {

    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.styleLightContent();
    
      this.platform.resume.subscribe(async () => {
        const trackNo = localStorage.getItem('intent');
        if (trackNo !== null && trackNo !== undefined && trackNo !== '') {
         // this.navCtrl.navigateForward('/home');
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
      
      this.statusBar.styleDefault();

    }else{
      this.storage.set('deviceID', 'browser');
    }


  }
  setPushAlerts() {
    this.storage.get('deviceToken').then(devToken => {
      if (devToken === null || devToken === undefined || devToken === '' || devToken === 'null'){
        this.fcm.notificationSetup();
      }});
    
    
  }
}
