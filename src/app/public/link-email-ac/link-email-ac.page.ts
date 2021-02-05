import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoaderService } from 'src/app/providers/loader.service';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { EmailAccount } from 'src/app/models/Providers';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-link-email-ac',
  templateUrl: './link-email-ac.page.html',
  styleUrls: ['./link-email-ac.page.scss'],
})
export class LinkEmailAcPage implements OnInit {
  proCode: any = '';
  socUser : SocialUser;
  emailAccount : EmailAccount = new EmailAccount();
  loggedIn : boolean;
  constructor(@Inject(NavController) private navCtrl: NavController,
  @Inject(SocialAuthService) private authService: SocialAuthService,
  @Inject(LoaderService) private loading: LoaderService,
  @Inject(TrackingService) public trackService: TrackingService,
  @Inject(GooglePlus) private googlePlus: GooglePlus) { }
  goBack() {
    this.navCtrl.back();
  }
  getallProviders(){
    this.trackService.getAllProviders().subscribe(data => {
      // tslint:disable-next-line: no-debugger
      
    },
    error => {
     
    });
  }
  ngOnInit() {
    //this.signOut();
    // this.authService.authState.subscribe((user) => {
    //   this.socUser = user;
    //   this.loggedIn = (user != null);
    // });
    var tok = localStorage.getItem('accessToken');
    if( tok === undefined || tok === null || tok === '' || tok === 'NA'){
       this.loggedIn = false;
    }
    else{
      this.loggedIn = true;
    }
  }
  proChange(){
    if(this.proCode === 'G'){
      this.googleSignIn();
    }
   //alert(this.proCode);
  }
  googleSignIn() {
    const googleLoginOptions = {
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
    
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, googleLoginOptions).then(user =>{
      this.socUser = user;
      localStorage.setItem('accessToken',user.authToken);
      this.emailAccount.UserName = localStorage.getItem('user');
      this.emailAccount.AuthToken = user.authToken;
      this.emailAccount.ProviderName = this.proCode;
      this.emailAccount.Password = '';
      this.LinkAccount();
      
      console.log(JSON.stringify(this.socUser));
      this.loading.presentToast('info','Successfully linked with '+this.socUser.firstName);
      this.navCtrl.navigateForward(`/listing-retailer`);
    }).catch(err =>{
      localStorage.setItem('accessToken','NA');
      this.loading.presentToast('error','Unable to Link Account!')
    });

  }
  LinkAccount(){
    this.trackService.saveEmailAccount(this.emailAccount).subscribe(data => {
      // tslint:disable-next-line: no-debugger
      
    },
    error => {
     
    });
  }
  signOut() {
    this.loggedIn = false;
    localStorage.setItem('accessToken','NA');
    this.authService.signOut(true).then(data =>{
      alert(JSON.stringify(data));
      this.loading.presentToast('info','Account De-Linked Successfully')
    }).catch(err =>{
      console.log(JSON.stringify(err));
      this.loading.presentToast('error','Unable to De-Link Account!')
    });
    //localStorage.setItem('accessId','0');
  }
}
