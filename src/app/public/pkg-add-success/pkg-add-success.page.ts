import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActivePackages } from 'src/app/models/active-packages';
import { TrackingScans } from 'src/app/models/TrackingScans';

@Component({
  selector: 'app-pkg-add-success',
  templateUrl: './pkg-add-success.page.html',
  styleUrls: ['./pkg-add-success.page.scss'],
})
export class PkgAddSuccessPage implements OnInit {
  item: ActivePackages;
  trackingScans: Array<TrackingScans> = [];
  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute,
  @Inject(Router) private router: Router,
   @Inject(NavController) private navCtrl: NavController) {
    
   }
  goBack() {
    this.navCtrl.back();
  }
  ionViewDidEnter(){
     setTimeout(() => { this.gotodetail();
   }, 2000);
   // wait 2 seconds
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.trackingScans = JSON.parse(params.scans);
      this.item = JSON.parse(params.item);
    });
  }
gotodetail(){
  const navigationExtras: NavigationExtras = {
    queryParams: {
        scans: JSON.stringify(this.trackingScans),
        item: JSON.stringify(this.item)
    }
    };
    this.router.navigate(['list-detail'], navigationExtras);
}
}
