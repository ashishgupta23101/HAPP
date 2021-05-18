import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, PopoverController, AlertController } from '@ionic/angular';
import { Trackingheader } from 'src/app/models/Trackingheader';
import { TrackingScans } from 'src/app/models/TrackingScans';
import { Storage } from '@ionic/storage';
import { ResultData } from 'src/app/models/ResultData';
import { TrackingService } from 'src/app/providers/tracking.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { QueryParams } from 'src/app/models/QueryParams';
import { ActivePackages } from 'src/app/models/active-packages';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute,
              @Inject(Storage) private storage: Storage,
              @Inject(TrackingService) private trackService: TrackingService ,
              @Inject(LoaderService) private loading: LoaderService,
              @Inject(AlertController) public alertController: AlertController,
              @Inject(Router) private router: Router,
              @Inject(NavController) private navCtrl: NavController) {}
hasData: any = false;
item: ActivePackages;

trackingScans: Array<TrackingScans> = [];
resultData: ResultData;
trackingHeader: Trackingheader;
trackNo: any ;
selectedData: any;
@ViewChild(SocialSharingComponent) social: SocialSharingComponent;

ngOnInit() {
  // tslint:disable-next-line: no-debugger
  this.route.queryParams.subscribe(params => {
    this.trackingScans = JSON.parse(params.scans);
    this.item = JSON.parse(params.item);
  });
 
if (this.trackingScans !== undefined  && this.trackingScans !== null){
this.hasData = true;
// this.loading.dismiss();
} else{
this.hasData = false;
// this.loading.dismiss();
}

}
share() {
this.social.presentActionSheet2();
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


