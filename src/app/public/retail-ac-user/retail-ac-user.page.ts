import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-retail-ac-user',
  templateUrl: './retail-ac-user.page.html',
  styleUrls: ['./retail-ac-user.page.scss'],
})
export class RetailAcUserPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
