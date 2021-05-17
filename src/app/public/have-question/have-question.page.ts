import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { FcmService } from 'src/app/providers/fcm.service';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-have-question',
  templateUrl: './have-question.page.html',
  styleUrls: ['./have-question.page.scss'],
})
export class HaveQuestionPage implements OnInit {
  loginForm: FormGroup;
  token: string;
  constructor(
    @Inject(Router) private router: Router,
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(Platform) private platform: Platform,
    @Inject(FunctionsService) public fun: FunctionsService,
    @Inject(TrackingService) public trackService: TrackingService,
    @Inject(NavController) private navCtrl: NavController) {
      this.loginForm = this.fb.group({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required)
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
      this.fun.presentToast('Please fill all details!', true, 'bottom', 2100);
      return false;
    } else {
     
      this.fun.showloader('Verifying User...');
      if (this.fun.validateEmail(form.email)) {
        const postreq = {
          Name:form.name , 
          Email: form.email,
          Message: form.message
        }
             this.trackService.saveSupport(postreq).subscribe(data => {
              // tslint:disable-next-line: no-debugger
                if (data.Error === true)
                { //localStorage.setItem('IsLogin', 'false');
                  this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
                  this.fun.dismissLoader();
                  return;
                }
                  this.fun.dismissLoader();
                  this.navCtrl.navigateForward('/helpconfirm');
            },
            error => {
             this.fun.dismissLoader();
            });
          } else {
            this.fun.dismissLoader();
            this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
          }
   }
  }
}
