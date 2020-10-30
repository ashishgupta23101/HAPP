import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pkgshipinfo',
  templateUrl: './pkgshipinfo.page.html',
  styleUrls: ['./pkgshipinfo.page.scss'],
})
export class PkgshipinfoPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
