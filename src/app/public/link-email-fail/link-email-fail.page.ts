import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-link-email-fail',
  templateUrl: './link-email-fail.page.html',
  styleUrls: ['./link-email-fail.page.scss'],
})
export class LinkEmailFailPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
