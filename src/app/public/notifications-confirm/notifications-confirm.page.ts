import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notifications-confirm',
  templateUrl: './notifications-confirm.page.html',
  styleUrls: ['./notifications-confirm.page.scss'],
})
export class NotificationsConfirmPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
