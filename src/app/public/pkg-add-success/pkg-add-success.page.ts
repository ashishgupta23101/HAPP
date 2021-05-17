import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pkg-add-success',
  templateUrl: './pkg-add-success.page.html',
  styleUrls: ['./pkg-add-success.page.scss'],
})
export class PkgAddSuccessPage implements OnInit {
  trackNo: any ;
  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute, @Inject(NavController) private navCtrl: NavController) {
    
   }
  goBack() {
    this.navCtrl.back();
  }
  ionViewDidEnter(){
     setTimeout(() => { this.navCtrl.navigateForward(`/list-detail/${this.trackNo}`);
   }, 2000);
   // wait 2 seconds
  }
  ngOnInit() {
    this.trackNo = this.route.snapshot.paramMap.get('any');
  }
gotodetail(){
  this.navCtrl.navigateForward(`/list-detail/${this.trackNo}`);
}
}
