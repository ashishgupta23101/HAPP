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
   
  }

  ngOnInit() {
    this.carrier = this.params.get('carrier');
    this.trackingNo = this.params.get('trackingNo');
  }

  dismiss() {
    this.modalController.dismiss();
  }


}
