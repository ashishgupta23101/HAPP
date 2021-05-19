import { Inject, Injectable } from '@angular/core';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TrackingService } from './tracking.service';
import { QueryParams } from 'src/app/models/QueryParams';
import { SessionData } from 'src/app/models/active-packages';
import { AuthUser } from '../models/user';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
@Injectable()
export class FcmService {
  queryParam: QueryParams;
authUser : AuthUser;
token: any;
  constructor(
              @Inject(TrackingService) private trackService : TrackingService,
              @Inject(FirebaseX) private firebase: FirebaseX,
              //@Inject(OneSignal) private oneSignal: OneSignal,
              @Inject(Storage) private storage : Storage,
              @Inject(Platform) private platform: Platform
          ) {
             
          }

          async getToken() {

            if (this.platform.is('android')) {
              this.token = await this.firebase.getToken();
            }
        
            if (this.platform.is('ios')) {
              this.token = await this.firebase.getToken();
              await this.firebase.grantPermission();
            }
            if (!this.token) return;
            this.storage.set('deviceToken', this.token);
            this.trackService.saveToken(this.token);
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
              // if (!token) return;
              // this.storage.set('deviceToken', token);
              // this.trackService.saveToken(token);
              // this.subscribetoMessage(token);
              // this.unsubscribetoMessage(token);
            });
        
            this.subscribetoMessage(this.token);
               
            this.onNotifications().subscribe(msg => {
              //this.trackService.logError(JSON.stringify(msg),'onNotifications()');
                  if (this.platform.is('ios')) {
                    let trackingNo = msg.TrackingNo.trim();
                    let carrier = msg.Carrier.trim();
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
        
            this.unsubscribetoMessage(this.token);

          }
          
          public oneSignalNotificationSetup() {

          
          }


}
