import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
  }

}
