import { Component, Inject, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { LoaderService } from 'src/app/providers/loader.service';
import { EmailAccount, Provider } from 'src/app/models/Providers';
import { TrackingService } from 'src/app/providers/tracking.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Component({
  selector: 'app-link-email-ac',
  templateUrl: './link-email-ac.page.html',
  styleUrls: ['./link-email-ac.page.scss'],
})
// cordova plugin add cordova-plugin-googleplus@4.0.5 --save --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.619491163084-e2gc4lrhvdm0psjtjmfdsim5mrmo7vpf
// npm install --save @ionic-native/google-plus@4
export class LinkEmailAcPage implements OnInit {
  proCode: any = '';
  emailAccount : EmailAccount = new EmailAccount();
  loggedIn : boolean;
  accessToken : string;
  providers : Array<Provider> = []
  constructor(@Inject(NavController) private navCtrl: NavController,
  @Inject(LoaderService) private loading: LoaderService,
  @Inject(TrackingService) public trackService: TrackingService,
  @Inject(GooglePlus) private google:GooglePlus,
  @Inject(AngularFireAuth) private fireAuth: AngularFireAuth,
  @Inject(Platform) private platform: Platform) {
    this.loading.present('Fetching Accounts..');
    this.getallProviders();
   }
  goBack() {
    this.navCtrl.back();
  }
  getallProviders(){
    this.trackService.getAllProviders().subscribe(data => {
      // tslint:disable-next-line: no-debugger

      this.providers = data.ResponseData;
      this.loading.dismiss();
    },
    error => {
      this.loading.presentToast('error', 'No Account Available.');
      this.loading.dismiss();
      this.goBack();
    });
  }
  ngOnInit() {
    var tok = localStorage.getItem('accessToken');
    if( tok === undefined || tok === null || tok === '' || tok === 'NA'){
       this.loggedIn = false;
    }
    else{
      this.loggedIn = true;
    }
  }
  proChange(){
    if(this.proCode === 'Google'){
      this.googleSignIn();
    }
   //alert(this.proCode);
  }
  googleSignIn() {
    this.platform.ready().then(() => {

      this.google.login({})
      .then((res) => {
        alert('response: ' + JSON.stringify(res));
       // const { idToken, accessToken } = response;
             this.accessToken = res.credential.accessToken;
             localStorage.setItem('accessToken',this.accessToken);
             this.emailAccount.Username = localStorage.getItem('user');
             this.emailAccount.AuthToken = this.accessToken;
             this.emailAccount.ProviderName = this.proCode;
             this.emailAccount.Password = '';
             this.loading.present('Linking Account.');
             this.LinkAccount();
            
             console.log(JSON.stringify(this.accessToken));
             this.loading.presentToast('info','Successfully linked with '+res.user.displayName);
             this.navCtrl.navigateForward(`/listing-retailer`);
           }).catch(err =>{
             localStorage.setItem('accessToken','NA');
             this.trackService.logError(JSON.stringify(err), 'googleSignIn()');
             this.loading.presentToast('error','Unable to Link Account!')
           });

    });


  }
  LinkAccount(){
    this.trackService.saveEmailAccount(this.emailAccount).subscribe(data => {
      // tslint:disable-next-line: no-debugger
      this.loading.dismiss();
      this.loading.presentToast('info', 'Account linked Successfully.');
    },
    error => {
      this.loading.dismiss();
      this.loading.presentToast('error', 'Unable to link Account.');
    });
  }
  signOut() {
    this.loggedIn = false;
    localStorage.setItem('accessToken','NA');
    this.loading.presentToast('info','Account De-Linked Successfully')
    // this.authService.signOut(true).then(data =>{
    //   alert(JSON.stringify(data));
    // }).catch(err =>{
    //   console.log(JSON.stringify(err));
    //   this.loading.presentToast('error','Unable to De-Link Account!')
    // });
    //localStorage.setItem('accessId','0');
  }
  // onLoginSuccess(accessToken, accessSecret) {
  //   const credential = accessSecret ? firebase.auth.GoogleAuthProvider
  //       .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
  //           .credential(accessToken);
  //   this.fireAuth.authState.signInWithCredential(credential)
  //     .then((response) => {
  //       //this.router.navigate(["/profile"]);
  //       //this.loading.dismiss();
  //     })

  // }
}
