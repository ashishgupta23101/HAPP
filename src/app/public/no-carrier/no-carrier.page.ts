import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-no-carrier',
  templateUrl: './no-carrier.page.html',
  styleUrls: ['./no-carrier.page.scss'],
})
export class NoCarrierPage implements OnInit {

  carrier = '';
  trackingNo = '';

  constructor(private modalController: ModalController, private params: NavParams) {
    this.carrier = params.get('carrier');
    this.trackingNo = params.get('trackingNo');
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }


}
