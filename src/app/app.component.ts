import { Component, Inject, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { LoaderService } from './providers/loader.service';
import { FcmService } from './providers/fcm.service';
import { TrackingService } from './providers/tracking.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  cusHome :any;
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
    localStorage.setItem('isScanned', 'false');
    this.cusHome = localStorage.getItem('cusHome');
    if (this.cusHome === null || this.cusHome === 'null' || this.cusHome === undefined || this.cusHome === '') {
      localStorage.setItem('cusHome', 'tp');
    }
    this.initializeApp();
    switch (this.cusHome) {
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

  ngOnInit() {
  
  }
  initializeApp() {
    const exptime = new Date(localStorage.getItem('expires'));
        const curtime = new Date();
        if (curtime >= exptime) {
        //   debugger;
        //   this.trackService.refreshToken().subscribe(data => {
        //     if (data.Error === true){ 
        //         localStorage.setItem('AuthToken', null);
        //           localStorage.setItem('IsLogin', 'false');
        //           localStorage.setItem('user', null);
        //   this.loadingController.presentToast('info','You are logged out. Please login');
        //           return;
        //         }
        //     if (data && data.ResponseData.AccessToken) {
        //           localStorage.setItem('AuthToken', data.ResponseData.AccessToken.Token);
        //           localStorage.setItem('expires', data.ResponseData.AccessToken.Expires);
        //           localStorage.setItem('IsLogin', 'true');
        //         }
        //    },
        //     error => {
        //       console.log(error);
        //       localStorage.setItem('AuthToken', null);
        //       localStorage.setItem('IsLogin', 'false');
        //       localStorage.setItem('user', null);
        //   this.loadingController.presentToast('info','You are logged out. Please login');
        //     });
        // }else{
          localStorage.setItem('AuthToken', null);
              localStorage.setItem('IsLogin', 'false');
              localStorage.setItem('user', null);
          this.loadingController.presentToast('info','You are logged out. Please login');
        }
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.styleLightContent();
    this.platform.ready().then(() => {
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
      this.trackService.GenerateDeviceID();
      this.statusBar.styleDefault();
      this.storage.get('deviceToken').then(devToken => {
        if (devToken === null || devToken === undefined || devToken === '' || devToken === 'null'){
          this.fcm.notificationSetup();
        }});
    }else{
      //this.fcm.notificationSetup();
      this.storage.set('deviceID', 'browser');
    }
      this.trackService.setLatestPackages();
      this.splashScreen.hide();
    }).catch(() => {
       this.splashScreen.hide();
    });
  }
  openUrl() {
    this.platform.ready().then(() => {
       // const browser = this.iab.create('https://shipmatrix.com/');
    });
  }
}
