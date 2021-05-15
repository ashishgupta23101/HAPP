import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  goBack() {
    this.navCtrl.back();
  }
  constructor(@Inject(NavController) private navCtrl: NavController,) { }

  username ='Not Available';

  ngOnInit() {}
  ionViewWillEnter() {
    this.username = localStorage.getItem('user');
    if (this.username === null || this.username === 'null' || this.username === undefined || this.username === '') {
      this.username = "Not Available";
     }
  }

}
