import { Component, Inject, OnInit } from '@angular/core';
import { ViewController } from '@ionic/core';
import { NavParams, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  trackNo: any ;
  pop: PopoverController;
  DeliveredDate: any;
  constructor(
    @Inject(NavParams) private navParams: NavParams
  ) { }
 
  ngOnInit() {}
  ionViewWillEnter() {
    this.trackNo = this.navParams.data.trackNo;
    this.pop = this.navParams.data.Popover;
  }
  async closeModal(data: any) {
    await this.pop.dismiss(data);
  }

  archive() {
    this.closeModal('archive');
  }

  MarkasDelievered() {
    this.closeModal('MarkasDelievered');
  }

  locate() {
    this.closeModal('locate');
  }

  gotoSettings() {
    this.closeModal('gotoSettings');
  }

  delete() {
    this.closeModal('delete');
  }

  share() {
    this.closeModal('share');
  }


}

