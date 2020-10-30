import { Component, Inject, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { LoaderService } from './providers/loader.service';
import { QueryParams } from './models/QueryParams';
import { FcmService } from './providers/fcm.service';
import { TrackingService } from './providers/tracking.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { inject } from '@angular/core/testing';
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
    @Inject(Network) private network: Network,
    @Inject(InAppBrowser) private iab: InAppBrowser
  ) {
    this.initializeApp();
  }

  tabreg: string = localStorage.getItem('IsLogin') === 'false' ? 'not-register' : 'welcome';
  ngOnInit() {
  }
  initializeApp() {

    this.platform.ready().then(() => {
      this.platform.resume.subscribe(async () => {
        const trackNo = localStorage.getItem('intent');
        if (trackNo !== null && trackNo !== undefined && trackNo !== '') {
         // this.navCtrl.navigateForward('/home');
        }
      });
      this.platform.pause.subscribe(async () => {
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
      this.statusBar.backgroundColorByHexString('#7606a7');
      this.fcm.notificationSetup();
      this.trackService.GenerateDeviceID();

    }else{
      this.storage.set('deviceID', 'browser');
    }
      this.trackService.saveToken();
      this.splashScreen.hide();
    }).catch(() => {
       this.splashScreen.hide();
    });
  }
  openUrl() {
    this.platform.ready().then(() => {
        const browser = this.iab.create('https://shipmatrix.com/');
    });
  }
}
