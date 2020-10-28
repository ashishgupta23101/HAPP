import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(    private router: Router,
    public fb: FormBuilder,
    private platform: Platform,
    public fun: FunctionsService,
    public trackService: TrackingService,
    private zone: NgZone) {
      this.registerForm = this.fb.group({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirm: new FormControl('', Validators.required)
      })
     }


  ngOnInit() {
  }
  register(form :any){
    if (!this.registerForm.valid) {
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
