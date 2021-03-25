import { Inject, Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TrackingService } from './tracking.service';
import { QueryParams } from 'src/app/models/QueryParams';
import { SessionData } from 'src/app/models/active-packages';
import { AuthUser } from '../models/user';
import { environment } from 'src/environments/environment';
import { Device } from '@ionic-native/device/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
@Injectable()
export class FcmService {
  queryParam: QueryParams;
authUser : AuthUser;
  constructor(
              @Inject(TrackingService) private trackService : TrackingService,
              @Inject(FirebaseX) private firebase: FirebaseX,
              @Inject(Device) private uniqueDeviceID: Device,
              @Inject(OneSignal) private oneSignal: OneSignal,
              @Inject(Storage) private storage : Storage,
              @Inject(Platform) private platform: Platform
          ) {
             
          }

          async getToken() {
            let token;
        
            if (this.platform.is('android')) {
              token = await this.firebase.getToken();
            }
        
            if (this.platform.is('ios')) {
              token = await this.firebase.getToken();
              await this.firebase.grantPermission();
            }
            if (!token) return;
            this.storage.set('deviceToken', token);
            this.trackService.saveToken(token);
          }
        
        
          subscribetoMessage(topic){
            this.firebase.subscribe(topic);
          }
        
          unsubscribetoMessage(topic){
            this.firebase.unsubscribe(topic);
          }
        
          refreshToken(){
            return this.firebase.onTokenRefresh();
          }
        
          onNotifications() {
            return this.firebase.onMessageReceived();
          }
        
          public FirebasenotificationSetup() {
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
          public oneSignalNotificationSetup() {
            this.storage.get('deviceToken').then(devToken => {
              if (devToken === null || devToken === undefined || devToken === '' || devToken === 'null'){
                this.platform.ready().then(() => {

                  if (this.platform.is('cordova')) {
          
                    if (this.platform.is('android')) {
                      this.oneSignal.startInit(environment.oneSignal.appid, environment.firebase.messagingSenderId);
                    }
                    if (this.platform.is('ios')) {
                      this.oneSignal.startInit(environment.oneSignal.appid);
                    }
                    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
                    this.oneSignal.handleNotificationReceived().subscribe(() => {
                      // do something when notification is received
                    });
                    this.oneSignal.handleNotificationOpened().subscribe(result => {
                      this.trackService.logError(JSON.stringify(result),'handleNotificationOpened');
                      if (this.platform.is('ios')) {
                        this.storage.get('apiData').then(aData => {
                          if (aData !== null && aData !== undefined) {
                            SessionData.apiURL = aData.apiURL ; 
                            SessionData.apiType = aData.apiType; 
                            }});
                            let notification : string;
                            notification = result.notification.data;
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
                    this.oneSignal.endInit();
                    this.oneSignal.getIds().then(identity => {
                      alert(identity.pushToken + " It's Push Token");
                      alert(identity.userId + " It's Devices ID");
                      this.storage.set('deviceToken', identity.userId);
                      this.trackService.saveToken(identity.userId);
                    });
                  }             
                });
          }else{
            this.trackService.saveToken(devToken);
          }
        });

          
          }


}
