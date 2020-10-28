import { Component, Inject, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QueryParams } from 'src/app/models/QueryParams';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-choose-carrier',
  templateUrl: './choose-carrier.page.html',
  styleUrls: ['./choose-carrier.page.scss'],
})
export class ChooseCarrierPage implements OnInit {

  carrier = '';
  trackingNo = '';
  carrierCode: any = '';
  queryParam: QueryParams;
  constructor(
    @Inject(ModalController) private modalController: ModalController,
    @Inject(LoaderService) public loadingController: LoaderService, 
    @Inject(TrackingService) private trackService: TrackingService,
    @Inject(NavParams) private params: NavParams) {
    this.carrier = params.get('carrier');
    this.trackingNo = params.get('trackingNo');
  }
  doTrack() {
    try {
      this.queryParam = new QueryParams();
      this.queryParam.TrackingNo = this.trackingNo;
      this.queryParam.Carrier = this.carrierCode;
      this.queryParam.Description = '';
      this.queryParam.Residential = 'true';
      this.carrierCode = '';
      this.trackService.getTrackingDetails(this.queryParam,'pkgadded');
    } catch (Exception) {
      this.trackService.logError(JSON.stringify(Exception), 'doTrack-home');
      this.loadingController.presentToast('Error', JSON.stringify(Exception));
    }
  }
  ngOnInit() {
  }

  dismiss() {
    debugger;
    this.modalController.dismiss();
  }

}
