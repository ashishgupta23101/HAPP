import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { FcmService } from 'src/app/providers/fcm.service';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {
  loginForm: FormGroup;
  token: string;
  constructor(
    @Inject(Router) private router: Router,
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(Platform) private platform: Platform,
    @Inject(FunctionsService) public fun: FunctionsService,
    @Inject(TrackingService) public trackService: TrackingService,
    @Inject(NavController) private navCtrl: NavController,
    @Inject(EmailComposer) private emailComposer: EmailComposer) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required)
    });
   }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    
  }
  login(form: any){
    this.sendMail('vaibhavit80@gmail.com');
    if (!this.loginForm.valid) {
      return false;
    } else {
      this.fun.showloader('Verifying User...');
      if (this.fun.validateEmail(form.email)) {
             this.trackService.refreshToken(form.email).subscribe(data => {
              // tslint:disable-next-line: no-debugger
                if (data.Error === true)
                { //localStorage.setItem('IsLogin', 'false');
                  this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
                  this.fun.dismissLoader();
                  return;
                }
                if (data && data.ResponseData.AccessToken) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  this.token = data.ResponseData.AccessToken.Token;
                  this.sendMail(form.email);
                  this.fun.dismissLoader();
                }
                else {
                  //localStorage.setItem('IsLogin', 'true');
                  this.fun.presentToast('Invalid Email! Please try with valid email.', true, 'bottom', 2100);
                  this.fun.dismissLoader();
                }

            },
            error => {
             localStorage.setItem('IsLogin', 'false');
             this.fun.dismissLoader();
             this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
            });
          } else {
            this.fun.dismissLoader();
            this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
          }
   }
  }
   sendMail(emailid:string){
      debugger;
      try{
        this.platform.ready().then(()=>{
          this.emailComposer.isAvailable().then((available: boolean) =>{
            if(available) {
              let email = {
                to: emailid,
                subject: 'Change Password Link',
                body: 'Hi , Please click on below link to change password!',
                isHtml: true
              }
              // Send a text message using default options
              this.emailComposer.open(email).then(data =>{
                this.navCtrl.navigateForward('/email-sent');
                
              }).catch(error=>{
                this.fun.presentToast('Failed to send mail.try again', true, 'bottom', 2100);
              });
            }
           });
        });
      }catch(ex){
        console.log(JSON.stringify(ex));
      }
   }
}
