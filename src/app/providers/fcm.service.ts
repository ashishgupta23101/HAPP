//import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
import { Inject, Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { TrackingService } from './tracking.service';
import { QueryParams } from 'src/app/models/QueryParams';
import { Device } from '@ionic-native/device/ngx';
import { SessionData } from 'src/app/models/active-packages';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';

@Injectable()
export class FcmService {
  queryParam: QueryParams;

  constructor(
    @Inject(TrackingService) private trackService : TrackingService,
              @Inject(Firebase) private firebase: FCM,
              @Inject(Storage) private storage : Storage,
              @Inject(AngularFirestore) private afs: AngularFirestore,
              @Inject(Device) private uniqueDeviceID: Device, 
              @Inject(Platform) private platform: Platform) {}
  async getToken() {
    let token;
    try{
    token = await this.firebase.getToken();
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.hasPermission();
    }
    if (!token) return;
    this.storage.set('deviceToken', token);
    this.saveToken(token);
    }catch(err){
      this.trackService.logError(JSON.stringify(err), 'getToken()');
    }
  }

  private saveToken(token) {
    if (!token) return;
    this.storage.set('deviceToken', token);
    const devicesRef = this.afs.collection('devices');
   // this.trackService.logError('Token'+ token , 'SaveToken');
   // alert(token);
    const data = {
      token,
      userId: 'testUserId'
    };

    return devicesRef.doc(token).set(data);
  }

  subscribetoMessage(topic){
    this.firebase.subscribeToTopic(topic);
  }

  unsubscribetoMessage(topic){
    this.firebase.unsubscribeFromTopic(topic);
  }

  refreshToken(){
    return this.firebase.onTokenRefresh();
  }

  onNotifications() {
    return this.firebase.onNotification();
  }

  public notificationSetup() {
    this.getToken();
    this.refreshToken().subscribe(token => {
      console.log(token);
    });

    this.subscribetoMessage(this.uniqueDeviceID);
       
    this.onNotifications().subscribe(msg => {

          if (this.platform.is('ios')) {
            this.storage.get('apiData').then(aData => {
              if (aData !== null && aData !== undefined) {
                 SessionData.apiURL = aData.apiURL ; 
                 SessionData.apiType = aData.apiType; 
                }});
            let notification : string;
            notification = msg.aps.alert.body;
            let message = notification.split(',');
            let trackingNoMessage = message[0].split(':');
            let carrierMessage = message[5].split(':');
            let trackingNo = trackingNoMessage[1].trim();
            let carrier = carrierMessage[1].trim();
            //let recordKey = trackingNo + '-' + carrier;

            try {
              this.queryParam = new QueryParams();
              this.queryParam.TrackingNo = trackingNo;
              this.queryParam.Carrier = carrier;
              this.queryParam.Description = '';
              this.queryParam.Residential = 'false';
              this.trackService.getTrackingDetails(this.queryParam);
              } catch (Exception) {
                this.trackService.logError(JSON.stringify(Exception),'notificationSetup()');
               // this.loadingController.presentToast('Error', JSON.stringify(Exception));
              }
            }
        });

        this.unsubscribetoMessage(this.uniqueDeviceID);
  }
}
