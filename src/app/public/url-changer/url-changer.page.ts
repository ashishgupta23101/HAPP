import { Component, Inject, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { SessionData } from 'src/app/models/active-packages';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/app/providers/tracking.service';
import { FcmService } from 'src/app/providers/fcm.service';
@Component({
  selector: 'app-url-changer',
  templateUrl: './url-changer.page.html',
  styleUrls: ['./url-changer.page.scss'],
})
export class UrlChangerPage implements OnInit {

  apiType = '';
  apiUrl = '';
  CurrapiUrl = '';
  constructor(@Inject(NavController) private navCtrl: NavController,
              @Inject(TrackingService) private trackService: TrackingService,
              @Inject(LoaderService) public loadingController: LoaderService,
              @Inject(FcmService) private fcm: FcmService,
              @Inject(Storage) private storage: Storage) {

    this.apiType = SessionData.apiType;
    this.apiUrl = SessionData.apiURL;
    this.CurrapiUrl = SessionData.apiURL;
    if (this.apiType === 'P'){
      this.apiUrl = environment.api_Url_Prod ;
      this.apiType = 'P';
     }else if (this.apiType === 'B'){
      this.apiUrl = environment.api_Url_Beta ;
      this.apiType = 'B';
     }else {
      this.apiUrl = this.apiUrl ;
      this.apiType = 'C';
     }
    
  }
  onTypeChange(){
    if (this.apiType === 'P'){
      this.apiUrl = environment.api_Url_Prod ;
     }else if (this.apiType === 'B'){
      this.apiUrl = environment.api_Url_Beta ;
     }else {
      this.apiUrl = '';
     }
  }
  ngOnInit() {
  }
  saveUrl(){
    try{
      if (this.apiUrl === null || this.apiUrl === undefined || this.apiUrl === '' ){
          this.loadingController.presentToast('Error', 'Invalid API url');
      }else{
          this.storage.set('apiData', {
            apiURL : this.apiUrl,
            apiType : this.apiType
          });
          SessionData.apiURL = this.apiUrl ;
          SessionData.apiType = this.apiType;
          localStorage.setItem('AuthToken', null);
          localStorage.setItem('IsLogin', 'false');
          localStorage.setItem('user', null);
          this.loadingController.presentToast('alert', 'API url successfully updated.');
         // this.fcm.FirebasenotificationSetup();
          this.navCtrl.navigateForward('/login')
     }
  }catch (Exception){

  }
  }
  dismiss() {
    this.navCtrl.pop();
  }
  goBack() {
    this.navCtrl.back();
    }
}
