import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-not-register',
  templateUrl: './not-register.page.html',
  styleUrls: ['./not-register.page.scss'],
})
export class NotRegisterPage implements OnInit {
  goBack() {
    this.navCtrl.back();
  }
  constructor(@Inject(NavController) private navCtrl: NavController,) { }

  username ='Not Available';

  ngOnInit() {
    this.username = localStorage.getItem('user');
    if (this.username === null || this.username === 'null' || this.username === undefined || this.username === '') {
      this.username = "Not Available";
     }
  }

}
