import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { VendorAccount } from 'src/app/models/vendorAccount';
import { Vendor } from 'src/app/models/vendors';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.page.html',
  styleUrls: ['./vendors.page.scss'],
})
export class VendorsPage implements OnInit {

  vendors : Array<Vendor> = []

selectedVendors : VendorAccount;
  constructor(@Inject(NavController) private navCtrl: NavController,
  @Inject(TrackingService) public trackService: TrackingService,
  @Inject(LoaderService) public loadingController: LoaderService) {
    
    
   }
  goBack() {
    this.navCtrl.back();
  }
  getAllVendors(){
    this.trackService.getAllVendors().subscribe(data => {
      // tslint:disable-next-line: no-debugger
      this.vendors = data.ResponseData;
      this.loadingController.dismiss();
    },
    error => {
      this.loadingController.dismiss();
      this.loadingController.presentToast('error', 'Unable to fetch Vendors');
    });
  }
  ngOnInit() {}
  ionViewWillEnter() {
    this.loadingController.present('Fetching Retailers..');
    this.getAllVendors();
    this.selectedVendors = new VendorAccount();
    this.selectedVendors.Username = localStorage.getItem('user');
    //this.getAllVendors();
  }
  chooseHome(event: any, cpage: string){
    this.selectedVendors.VendorNames = [];
    this.vendors.forEach(val => {
      if(val.IsSelected === true){
        this.selectedVendors.VendorNames.push(val.VendorName);
      }
    });
    // alert(localStorage.getItem('cusHome'));
  }
  save(){
    this.loadingController.present('Saving Retailers..');
    this.trackService.saveVendor(this.selectedVendors).subscribe(data => {
      // tslint:disable-next-line: no-debugger
      this.loadingController.dismiss();
      this.loadingController.presentToast('info', 'Vendor linked Successfully.');
    },
    error => {
      this.loadingController.dismiss();
      this.loadingController.presentToast('error', 'Unable to link Vendors');
    });
  }
}
