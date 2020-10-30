import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.page.html',
  styleUrls: ['./email-sent.page.scss'],
})
export class EmailSentPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
