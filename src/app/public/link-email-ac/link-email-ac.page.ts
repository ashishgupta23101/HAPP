import { Component, Inject, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { LoaderService } from 'src/app/providers/loader.service';
import { EmailAccount, Provider } from 'src/app/models/Providers';
import { TrackingService } from 'src/app/providers/tracking.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
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
  providers : Array<Provider> = [];
  constructor(@Inject(NavController) private navCtrl: NavController,
  @Inject(LoaderService) private loading: LoaderService,
  @Inject(TrackingService) public trackService: TrackingService,
  @Inject(GooglePlus) private google:GooglePlus,
  @Inject(Platform) private platform: Platform) {
    
    
   }
  goBack() {
    this.navCtrl.back();
  }
  getallProviders(){
    this.trackService.getAllProviders().subscribe(data => {
      // tslint:disable-next-line: no-debugger
      this.proCode ='';
      this.providers = data.ResponseData;
      this.loading.dismiss();
    },
    error => {
      this.proCode ='';
      this.trackService.logError(JSON.stringify(error),'getallProviders');
      this.loading.presentToast('error', 'No Account Available.');
      this.loading.dismiss();
      this.goBack();
    });
  }
  ngOnInit() {
    this.loading.present('Fetching Accounts..');
    this.getallProviders();
  }
  proChange(){
    if(this.providers.filter(item => {return item.ProviderName === this.proCode && item.IsLinked === true}).length > 0){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
      if(this.proCode === 'Google'){
        this.googleSignIn();
      }
  }
   //alert(this.proCode);
  }
  googleSignIn() {
    this.platform.ready().then(() => {
      this.loading.present('Linking Account.');
      this.google.login({'scopes': 'https://www.googleapis.com/auth/gmail.readonly',
      'offline': true,})
      .then((res) => {
             this.trackService.logError("Email Log - "+JSON.stringify(res),"googleSignin()")
             localStorage.setItem('accessToken',res.accessToken);
             this.emailAccount.Username = res.email;
             this.emailAccount.AuthToken = res.refreshToken;
             this.emailAccount.ProviderName = this.proCode;
             this.emailAccount.Password = '';
             this.proCode = ''; 
             this.LinkAccount(this.emailAccount);
             //this.loading.presentToast('info','Successfully linked with '+res.user.displayName);
             
           }).catch(err =>{
            this.loading.dismiss();
             localStorage.setItem('accessToken','NA');
             this.trackService.logError(JSON.stringify(err), 'googleSignIn()');
             this.loading.presentToast('error','Unable to Link Account!')
           });

    });


  }
  LinkAccount(_emailAccount :EmailAccount){
    this.trackService.saveEmailAccount(_emailAccount).subscribe(data => {
      this.loggedIn = true;
      this.proCode = '';
      // tslint:disable-next-line: no-debugger
      this.loading.dismiss();
      //this.loading.presentToast('info', 'Account linked Successfully.');
      this.navCtrl.navigateForward(`/account-link`);
    },
    error => {
      this.loading.dismiss();
      this.proCode = '';
      this.trackService.logError(JSON.stringify(error), 'googleSignIn()');
      this.loading.presentToast('error', 'Unable to link Account.');
    });
  }
  signOut() {
    this.trackService.DelEmailAccount(this.proCode).subscribe(data => {
      this.loggedIn = false;
      this.proCode = '';
      localStorage.setItem('accessToken','NA');
      this.navCtrl.navigateForward(`/account-unlink`);
      this.google.logout().then(()=>{
        localStorage.setItem('accessToken','NA');
      });
    },
    error => {
      this.loading.dismiss();
      this.trackService.logError(JSON.stringify(error), 'googleSignIn()');
      this.loading.presentToast('error', 'Unable to De-link Account.');
    });
    
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
