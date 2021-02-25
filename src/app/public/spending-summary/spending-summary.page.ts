import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-spending-summary',
  templateUrl: './spending-summary.page.html',
  styleUrls: ['./spending-summary.page.scss'],
})
export class SpendingSummaryPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) { }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }
}
