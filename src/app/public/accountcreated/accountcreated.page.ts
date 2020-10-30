import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-accountcreated',
  templateUrl: './accountcreated.page.html',
  styleUrls: ['./accountcreated.page.scss'],
})
export class AccountcreatedPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
