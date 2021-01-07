import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoaderService } from 'src/app/providers/loader.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-link-email-ac',
  templateUrl: './link-email-ac.page.html',
  styleUrls: ['./link-email-ac.page.scss'],
})
export class LinkEmailAcPage implements OnInit {
  proCode: any = '';
  constructor(@Inject(NavController) private navCtrl: NavController,@Inject(SocialAuthService) private authService: SocialAuthService,
  @Inject(LoaderService) private loading: LoaderService,@Inject(GooglePlus) private googlePlus: GooglePlus) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }
  proChange(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user =>{
      alert(JSON.stringify(user));
    }).catch(err =>{
      alert(JSON.stringify(err));
    });
   alert(this.proCode);
   this.authService.authState.subscribe((user) => {
    alert(JSON.stringify(user));

  });
   //this.googleSignIn();
  }
  googleSignIn() {
    this.googlePlus.login({})
    .then(res => {
      console.log(res);

      alert(JSON.stringify(res));
      // this.displayName = res.displayName;
      // this.familyName = res.familyName;
      // this.givenName = res.givenName;
      // this.userId = res.userId;
      // this.imageUrl = res.imageUrl;
      // user.email = res.email;
      localStorage.setItem('authUser', res.email);
      localStorage.setItem('IsAuth', "true");
      //this.saveUser(user);
    })
    .catch(err => {
      alert(JSON.stringify(err));
      localStorage.setItem('authUser', 'NA');
      localStorage.setItem('IsAuth', "false");
      this.loading.presentToast('error','Error logging into Google');
    });
  }
}
