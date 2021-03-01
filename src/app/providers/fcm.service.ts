import { FCM } from '@ionic-native/fcm/ngx';
import { Inject, Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { auth } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { TrackingService } from './tracking.service';
import { QueryParams } from 'src/app/models/QueryParams';
import { Device } from '@ionic-native/device/ngx';
import { SessionData } from 'src/app/models/active-packages';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthUser } from '../models/user';
@Injectable()
export class FcmService {
  queryParam: QueryParams;
authUser : AuthUser;
  constructor(
    @Inject(TrackingService) private trackService : TrackingService,
              @Inject(Firebase) private firebase: Firebase,
              @Inject(Storage) private storage : Storage,
              @Inject(AngularFirestore) private afs: AngularFirestore,
              @Inject(Device) private uniqueDeviceID: Device, 
              @Inject(Platform) private platform: Platform,
              @Inject(AngularFireAuth) public afAuth: AngularFireAuth,
              @Inject(AngularFireAuth) private angularFireAuth: AngularFireAuth
          ) {
              this.afAuth.authState.subscribe(user => {
                  this.authUser = user;
              })
          }
   getToken() {
   // let token;
    try{
      //this.platform.ready().then(() => {
       // if (this.platform.is('android')) {
          this.firebase.getToken().then(token =>{
            if (this.platform.is('ios')) {
              // token =  this.firebase.getToken();
                 this.firebase.grantPermission();
             }
             //this.trackService.logError(JSON.stringify(token), 'getToken()');
             if (!token) return;
             this.storage.set('deviceToken', token);
             this.saveToken(token);
          }).catch(err=>{
            this.trackService.logError(JSON.stringify(err), 'getToken()');
          });
       // }
    
       

     // });
    }catch(err){
      this.trackService.logError(JSON.stringify(err), 'getToken()');
      
    }
   // token = await this.firebase.getToken();
   
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
    this.firebase.subscribe(topic);
  }

  unsubscribetoMessage(topic){
    this.firebase.unsubscribe(topic);
  }

  refreshToken(){
    return this.firebase.onTokenRefresh();
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }

  public notificationSetup() {
     this.platform.ready().then(() => {
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
      });

  }

  // Firebase SignInWithPopup


// Firebase Google Sign-in
SigninWithGoogle():Promise<any> {
  return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  .then((res) => {
      console.log(res);
  }).catch((error) => {
     console.log(error);
  })
}

// Firebase Logout 
SignOut() {
    return this.afAuth.auth.signOut().then(() => {
       // this.router.navigate(['login']);
    })
}

}
