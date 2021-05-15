import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { FcmService } from 'src/app/providers/fcm.service';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(  @Inject(FcmService) private fcm: FcmService,
                 @Inject(FormBuilder) public fb: FormBuilder,
                 @Inject(Platform) private platform: Platform,
                 @Inject(FunctionsService) public fun: FunctionsService,
                 @Inject(TrackingService) public trackService: TrackingService,
                 @Inject(NgZone) private zone: NgZone, @Inject(NavController) private navCtrl: NavController) {
      this.registerForm = this.fb.group({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirm: new FormControl('', Validators.required)
      });
     }

     goBack() {
      this.navCtrl.back();
    }
  ngOnInit() {
  }
  register(form: any){
    if (!this.registerForm.valid) {
      this.fun.presentToast('Please fill all value!', true, 'bottom', 2100);
      return false;
    } else {
      if(form.confirm !== form.password){
        this.fun.presentToast('Password not matched with confirm password!', true, 'bottom', 2100);
        return false;
      }
      const usr = new User();
      usr.email = form.email;
      usr.password = form.password;
      this.fun.showloader('Verifying User...');
      if (this.fun.validateEmail(usr.email)) {
             this.trackService.register(usr.email , usr.password, form.confirm).subscribe(data => {
              // tslint:disable-next-line: no-debugger
              this.zone.run(() => {
                if (data.Error === true)
                { //localStorage.setItem('IsLogin', 'false');
                  this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
                  this.fun.dismissLoader();
                  return;
                }
                if (data && data.ResponseData.AccessToken) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('AuthToken', data.ResponseData.AccessToken.Token);
                  localStorage.setItem('user', usr.email);
                  localStorage.setItem('expires', data.ResponseData.AccessToken.Expires);
                  this.fun.dismissLoader();
                  this.fcm.FirebasenotificationSetup();
                  localStorage.setItem('IsLogin', 'true');
                  this.fun.navigate('welcome', false);
                }
                else {
                  this.fun.presentToast('Invalid Credentials! Please try with valid login credentials.', true, 'bottom', 2100);
                  this.fun.dismissLoader();
                }
            });
            },
            error => {
              //localStorage.setItem('user', 'dummyUser');
             //localStorage.setItem('IsLogin', 'false');
             this.fun.dismissLoader();
             this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
            });

          } else {
            this.fun.dismissLoader();
            this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
          }
   }
  }
}
