import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pkg-add-success',
  templateUrl: './pkg-add-success.page.html',
  styleUrls: ['./pkg-add-success.page.scss'],
})
export class PkgAddSuccessPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
