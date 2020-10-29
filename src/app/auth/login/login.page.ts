import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    @Inject(Router) private router: Router,
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(Platform) private platform: Platform,
    @Inject(FunctionsService) public fun: FunctionsService,
    @Inject(TrackingService) public trackService: TrackingService,
    @Inject(NgZone) private zone: NgZone) {
      this.loginForm = this.fb.group({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
     }

  ngOnInit() {
  }
  signin(){

  }
  
  login(form :any){
    if (!this.loginForm.valid) {
      return false;
    } else {
      let usr = new User();
      usr.email = form.email;
      usr.password = form.password;
      this.platform.ready().then(() => {
        this.fun.showloader("Verifying User...");
        if (this.platform.is('cordova')) {
          if (this.fun.validateEmail(usr.email)) {
             this.trackService.login(usr.email , usr.password).subscribe(data => {
              // tslint:disable-next-line: no-debugger
              this.zone.run(()=>{
              if(data.Error === true)
              { localStorage.setItem('IsLogin', "false");
                this.fun.presentToast('Something went wrong!', true, 'bottom', 2100);
                this.fun.dismissLoader();
                return;
              }
              this.fun.dismissLoader();
              localStorage.setItem('IsLogin', "false");
              this.fun.navigate('home', false);
            });
            },
            error => {
             localStorage.setItem('IsLogin', "false");
              this.fun.dismissLoader();
              this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
            });
            
          } else {
            this.fun.dismissLoader();
            this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
          }
        } else {
          this.fun.dismissLoader();
          this.fun.navigate('home', false);
          this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
        }
      });
   }
  }
}
