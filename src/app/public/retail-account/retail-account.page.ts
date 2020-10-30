import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-retail-account',
  templateUrl: './retail-account.page.html',
  styleUrls: ['./retail-account.page.scss'],
})
export class RetailAccountPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
