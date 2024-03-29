import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {
  loginForm: FormGroup;
  token: string;
  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(FunctionsService) public fun: FunctionsService,
    @Inject(TrackingService) public trackService: TrackingService,
    @Inject(NavController) private navCtrl: NavController) {
      this.loginForm = this.fb.group({
        email: new FormControl('', Validators.required)
      });
   }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    
  }
  ionViewDidEnter() {
   this.loginForm.reset();
  }
  login(form: any){
    if (!this.loginForm.valid) {
      this.fun.presentToast('Please fill value!', true, 'bottom', 2100);
      return false;
    } else {
      this.fun.showloader('Verifying User...');
      if (this.fun.validateEmail(form.email)) {
             this.trackService.refreshToken(form.email).subscribe(data => {
              // tslint:disable-next-line: no-debugger
                if (data.Error === true)
                { //localStorage.setItem('IsLogin', 'false');
                  this.trackService.logError(data.Message,"forgotPassword");
                  this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
                  this.fun.dismissLoader();
                  return;
                }
                if (data && data.Message === 'Sent') {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  this.fun.dismissLoader();
                  this.navCtrl.navigateForward('/email-sent');
                }
                else {
                  //localStorage.setItem('IsLogin', 'true');
                  this.trackService.logError(JSON.stringify(data),"forgotPassword");
                  this.fun.presentToast('Invalid Email! Please try with valid email.', true, 'bottom', 2100);
                  this.fun.dismissLoader();
                }

            },
            error => {
             this.fun.dismissLoader();
             this.trackService.logError(JSON.stringify(error),"forgotPassword");
             this.fun.presentToast('Invalid Email! Please try with valid email.!', true, 'bottom', 2100);
            });
          } else {
            this.fun.dismissLoader();
            this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
          }
   }
  }

}
