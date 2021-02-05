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

  vendors : Array<Vendor> = [
    {VendorName : "Amazon",
    Phone : "9999999999",
    Email : "amazon@gmail.com",
    Url : "amazon.com",
    IsSelected : true },
    {VendorName : "Etsy",
    Phone : "9999999999",
    Email : "ETSY@gmail.com",
    Url : "amazon.com",
    IsSelected : false },
    {VendorName : "Overstock",
    Phone : "9999999999",
    Email : "amazon@gmail.com",
    Url : "amazon.com",
    IsSelected : false },
    {VendorName : "Target",
    Phone : "9999999999",
    Email : "amazon@gmail.com",
    Url : "amazon.com",
    IsSelected : false },
    {VendorName : "Walmart",
    Phone : "9999999999",
    Email : "amazon@gmail.com",
    Url : "amazon.com",
    IsSelected : false },
    {VendorName : "Wayfair",
    Phone : "9999999999",
    Email : "amazon@gmail.com",
    Url : "amazon.com",
    IsSelected : false }
]

selectedVendors : VendorAccount;
  constructor(@Inject(NavController) private navCtrl: NavController,
  @Inject(TrackingService) public trackService: TrackingService,
  @Inject(LoaderService) public loadingController: LoaderService) { }
  goBack() {
    this.navCtrl.back();
  }
  getAllVendors(){
    this.trackService.getAllVendors().subscribe(data => {
      // tslint:disable-next-line: no-debugger
    },
    error => {
     
    });
  }
  ngOnInit() {
    this.selectedVendors = new VendorAccount();
    this.selectedVendors.UserName = localStorage.getItem('user');
    this.getAllVendors();
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
    this.trackService.saveVendor(this.selectedVendors).subscribe(data => {
      // tslint:disable-next-line: no-debugger
      
    },
    error => {
     
    });
  }
}
