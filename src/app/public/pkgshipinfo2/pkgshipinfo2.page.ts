import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pkgshipinfo2',
  templateUrl: './pkgshipinfo2.page.html',
  styleUrls: ['./pkgshipinfo2.page.scss'],
})
export class Pkgshipinfo2Page implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
