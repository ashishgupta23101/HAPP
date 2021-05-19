import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { TrackingScans } from 'src/app/models/TrackingScans';
import { LoaderService } from 'src/app/providers/loader.service';
import { ActivePackages } from 'src/app/models/active-packages';
import { SocialSharingService } from 'src/app/providers/social-sharing.service';
import { HelperService } from 'src/app/providers/helper.service';
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute,
              @Inject(LoaderService) private loading: LoaderService,
              @Inject(AlertController) public alertController: AlertController,
              @Inject(Router) private router: Router,
              @Inject(SocialSharingService) public social: SocialSharingService,
              @Inject(HelperService) public helper: HelperService,
              @Inject(NavController) private navCtrl: NavController) {}

item: ActivePackages = new ActivePackages();

trackingScans: Array<TrackingScans> = [];
trackNo: any ;
selectedData: any;

ngOnInit() {
  // tslint:disable-next-line: no-debugger
  this.route.queryParams.subscribe(params => {
    this.trackingScans = JSON.parse(params.scans);
    this.item = JSON.parse(params.item);
  });

}
share(itm: ActivePackages) {
  const carrierName = this.helper.GetCarrierName(itm.Carrier);
  let url = '';
  let image = '';
  let message = 'Tracking Number: ' + itm.TrackingNo + '\n Carrier: ' + carrierName + '\n Status: ' + itm.Status;
  let subject = 'Package Status';
  this.social.share2(
    message,
    subject,
    image,
    url
  );
  }
goBack() {
  this.gotoActivePackages();
}
gotoActivePackages() {
this.navCtrl.navigateForward('/listing');
}

locate() {
if (this.trackingScans !== undefined  && this.trackingScans !== null && this.trackingScans.length > 0) {
const navigationExtras: NavigationExtras = {
queryParams: {
    scans: JSON.stringify(this.trackingScans),
    item: JSON.stringify(this.item)
}
};
this.router.navigate(['product-activity'], navigationExtras);
} else {
this.loading.presentToast('Warning', 'No Scans to Locate.');
}
}

editPackages() {
this.navCtrl.navigateForward(`/edit-package/${this.trackNo}`);
}


}


