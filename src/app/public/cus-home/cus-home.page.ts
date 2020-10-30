import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cus-home',
  templateUrl: './cus-home.page.html',
  styleUrls: ['./cus-home.page.scss'],
})
export class CusHomePage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }
}
