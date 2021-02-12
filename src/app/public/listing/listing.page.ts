
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { ActivePackages, SessionData } from 'src/app/models/active-packages';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationExtras, Router } from '@angular/router';
import { QueryParams } from 'src/app/models/QueryParams';
import { TrackingService } from 'src/app/providers/tracking.service';
import * as $ from 'jquery';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
// tslint:disable-next-line: max-line-length
constructor(
  @Inject(TrackingService) private trackService: TrackingService,
  @Inject(Router) private router: Router,
  @Inject(LoaderService) private loading: LoaderService,
  @Inject(AlertController) public alertController: AlertController,
  @Inject(NavController) private navCtrl: NavController ,
  @Inject(MenuController) private menuCtrl: MenuController,
  @Inject(Storage) private storage: Storage) {
        // tslint:disable-next-line: no-debugger
     // tslint:disable-next-line: only-arrow-functions
     
     const cusHome = localStorage.getItem('cusHome');
     if (cusHome !== null && cusHome !== 'null' && cusHome !== undefined && cusHome !== ''  && cusHome === 'hp') {
       this.segmentModel = 'history';
      }else{
        this.segmentModel = 'active';
      }
     this.segmentChanged();
  }
  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;
public searchTerm = '';
// tslint:disable-next-line: variable-name
mainMenu = true;
carrierMenu = false;
statusMenu = false;
dateMenu = false;
public sortbyDate = 'Date Created';
public sessionData: any;
public filtBy: string;
public segmentModel: string;
public sortBy;
public Issidemenu : string = 'Filter';
public dateSelected: any = formatDate(new Date(), 'MM/dd/yyyy', 'en');
public activeItems: Array<ActivePackages>;
filterName = 'Filter by';
readyToLoad = false;
@ViewChild(SocialSharingComponent) social: SocialSharingComponent;
Carrier = {
  ups: false,
  usps: false,
  dhl: false,
  fedex: false,
  ontrack: false,
  purolator: false
};
Status = {
  delivered: false,
  intransit: false,
  exception: false
};
Date = {
  today: false,
  yesterday: false,
  thisweek: false,
  lastweek: false,
  thismonth: false,
  lastmonth: false
};
ngOnInit() {

}

menu(b){
  if (b === 'c'){
    this.filterName = 'Carrier';
    this.carrierMenu = true;
    this.statusMenu = false;
    this.dateMenu = false;
    this.mainMenu = false;
  }
  else if (b === 's'){
    this.filterName = 'Status';
    this.mainMenu = false;
    this.carrierMenu = false;
    this.statusMenu = true;
    this.dateMenu = false;
  }else if (b === 'd'){
    this.filterName = 'Date';
    this.mainMenu = false;
    this.carrierMenu = false;
    this.statusMenu = false;
    this.dateMenu = true;
  }else {
    this.filterName = 'Carrier';
    this.mainMenu = false;
    this.carrierMenu = true;
    this.statusMenu = false;
    this.dateMenu = false;
  }
}
radio_list = [
  {name:'Carrier',value:'carr'},
  {name:'Status',value:'stat'},
  {name:'Date',value:'dat'},
  {name:'Retailer',value:'retail'},
  {name:'Category',value:'cate'}
]
clearall(){
  this.Carrier = {
    ups: false,
    usps: false,
    dhl: false,
    fedex: false,
    ontrack: false,
    purolator: false
  };
  this.Status = {
    delivered: false,
    intransit: false,
    exception: false
  };
  this.Date = {
    today: false,
    yesterday: false,
    thisweek: false,
    lastweek: false,
    thismonth: false,
    lastmonth: false
  };
  this.menuback();
  this.menuCtrl.toggle();
}
radioGroupChange(event) {

  this.menuCtrl.toggle();
  this.loading.present('Applying sorting..');
  this.sortBy = event.detail.value;
  this.sortedBy();

}


radioSelect(event) {
  console.log("radioSelect",event.detail);
  this.selectedRadioItem = event.detail;
}
openMenu(sm : string){
  switch(sm){
  case 'f':
  this.Issidemenu = 'Filter';
  break;
  case 's':
    this.Issidemenu = 'Sort';
    break;
    default :
    this.Issidemenu = 'Filter';
  }
  this.menuCtrl.toggle();
}
apply(){
  this.loading.present('Applying filter..');
  this.menuback();
  this.menuCtrl.toggle();
  if (this.Carrier.dhl){
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('dhl') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }
  }
  if (this.Carrier.ups){
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('ups') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }
  }
  if (this.Carrier.usps){
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('usps') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }
  }
  if (this.Carrier.fedex){
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('fedex') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }
  }
  if (this.Carrier.ontrack){
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('ontrack') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }
  }
  if (this.Carrier.purolator){
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.activeItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.activeItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.activeItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.activeItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.activeItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.activeItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('purolator') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }
  }
  this.loading.dismiss();
}
menuback(){
  this.filterName = 'Filter by';
  this.mainMenu = true;
  this.carrierMenu = false;
  this.statusMenu = false;
  this.dateMenu = false;
}
ionViewWillEnter(){
  this.segmentChanged() ;
}
doRefresh(event) {
  if (this.sessionData !== '' && this.sessionData !== undefined && this.sessionData !== null){
    this.trackService.refreshTrackingDetails(this.sessionData.packages.All);
    event.target.complete();
  }
}
retrackAll(){
  if (this.sessionData !== '' && this.sessionData !== undefined && this.sessionData !== null){
    this.trackService.refreshTrackingDetails(this.sessionData.packages.All);
  }
}
searchPackages() {
  if (this.searchTerm === '' || this.searchTerm === undefined || this.searchTerm === null){
    this.refreshList();
  } else {
  switch (this.sortBy) {
    case 'All':
        this.activeItems = this.trackService.filterItems(SessionData.packages.All, this.searchTerm);
        break;
      case 'Today':
          this.activeItems = this.trackService.filterItems(SessionData.packages.Today, this.searchTerm);
          break;
        case 'Yesterday':
            this.activeItems = this.trackService.filterItems(SessionData.packages.Yesterday, this.searchTerm);
            break;
          case 'ThisWeek':
              this.activeItems = this.trackService.filterItems(SessionData.packages.ThisWeek, this.searchTerm);
              break;
            case 'LastWeek':
                this.activeItems = this.trackService.filterItems(SessionData.packages.LastWeek, this.searchTerm);
                break;
                default:
                    this.activeItems = this.trackService.filterItems(SessionData.packages.All, this.searchTerm);
                    break;
   }
 }
}

refreshList(showLoader: boolean = false) {
  this.loading.dismiss();
  if (showLoader) { this.loading.present('Refreshing...'); }
  // tslint:disable-next-line: only-arrow-functions
  this.searchTerm = '';
  this.dateSelected = formatDate(new Date(), 'MM/dd/yyyy', 'en');
  setTimeout(() => {
    this.segmentChanged();
    this.loading.dismiss();
 }, 800);
}
segmentChanged() {
  this.activeItems = [];
  switch (this.segmentModel) {
    case 'active':
      this.storage.get('_activePackages').then((value) => {
        if (value !== '' && value !== undefined && value !== null){
        this.trackService.setPackagestoSession(value);
        this.sessionData = SessionData;
        this.activeItems = SessionData.packages.All;
        this.sortedBy();
        this.filterBy();
        }
        this.readyToLoad = true;
     });
      break;
    case 'history':
      this.storage.get('_archivePackages').then((value) => {
        if (value !== '' && value !== undefined && value !== null){
        this.trackService.setarchivePackagestoSession(value);
        this.sessionData = SessionData;
        this.activeItems = SessionData.packages.All;
        this.sortedBy();
        this.filterBy();
        }
        this.readyToLoad = true;
     });
      break;
  }

}
sortedBy() {
 try{
  switch (this.sortBy) {
    case 'carr':
        this.activeItems = this.activeItems.sort((a,b) => a.Carrier.localeCompare(b.Carrier));
        break;
      case 'stat':
          this.activeItems = this.activeItems.sort((a,b) => a.Status.localeCompare(b.Status));
          break;
        case 'dat':
            this.activeItems = this.activeItems.sort((a,b) => a.ExpectedDate.localeCompare(b.ExpectedDate));
            break;
          case 'retail':
              //this.activeItems = this.activeItems.sort((a,b) => a.Carrier.localeCompare(b.Carrier));
              break;
            case 'cate':
                //this.activeItems = this.activeItems.sort((a,b) => a.Carrier.localeCompare(b.Carrier));
                break;
                default:
                    this.activeItems = this.activeItems;
                    break;
  }
  this.loading.dismiss();
}catch(e){
  this.loading.dismiss(); 
}

}
filterBy() {
  switch (this.filtBy) {
    case 'Retailer':
        this.activeItems = SessionData.packages.All;
        break;
    case 'Status':
        this.activeItems = SessionData.packages.Today;
        break;
    case 'Category':
        this.activeItems = SessionData.packages.Yesterday;
        break;
    default:
        this.activeItems = SessionData.packages.All;
        break;
  }
}
showDetail(key: any){
  this.navCtrl.navigateForward(`/list-detail/${key}`);
}
sortByDates() {
  switch (this.sortBy) {
    case '1':
        this.sortbyDate = 'Date Created';
        break;
    case '2':
        this.sortbyDate = 'Expected By';
        break;
    case '3':
        this.sortbyDate = 'Last Updated';
        break;
    default:
        this.sortbyDate = 'Date Created';
        break;
  }
}
searchByDate() {
  if (this.sessionData !== undefined && this.sessionData !== null){
    this.activeItems = this.trackService.filterDatewise(SessionData.packages.All, this.dateSelected);
  }
}

archive(key: string) {
this.presentConfirm(key, 'Archive', 'Do you want to archive the package?', 'arc');
}
share() {
  this.social.presentActionSheet2();
  }
retrack(key: string) {
  this.presentConfirm(key, 'Re-Track', 'Do you want to Re-Track the package?', 'rtrck');
}

delete(key: string) {
this.presentConfirm(key, 'Delete', 'Do you want to delete the package?', 'del');
}
locate(key: string) {
this.storage.get('_activePackages').then(aData => {
  const val1 = aData.find(item => item.trackingNo === key);
  if (val1 !== undefined && val1 !== '' && val1 !== null && val1.scans.length > 0) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          scans: JSON.stringify(val1.scans)
      }
  };
    this.router.navigate(['product-activity'], navigationExtras);
  } else {
    this.loading.presentToast('Warning', 'No Scans to Locate.');
  }
});
}

MarkasDelievered(key: string) {
this.presentConfirm(key, 'Mark as Delivered', 'Do you want to mark the package delivered?', 'masd');
}
editPackages(key: string) {
this.navCtrl.navigateForward(`/edit-package/${key}`);
}
// tslint:disable-next-line: variable-name
async presentConfirm(key: string , _header: string, _message: string, _opration: string) {

try {
  let keyItem = key.split('-');
const alert = await this.alertController.create({
  header: _header,
  message: _message,
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Ok',
      handler: () => {
        switch (_opration)
        {
          case 'arc':
              this.loading.present('Archiving...');
              this.storage.get('_activePackages').then(tData => {
                  if (tData == null) {
                  tData = []; }
                  // tslint:disable-next-line: max-line-length
                  const index = tData.findIndex(item => item.trackingNo === key.trim());
                  if (index >= 0) {
                    // tslint:disable-next-line: no-shadowed-variable
                    const record: any = tData.find(item => item.trackingNo === key.trim());
                    tData.splice(index, 1);
                    this.storage.set('_activePackages', tData);
                    this.storage.get('_archivePackages').then(aData => {
                        if (aData == null) {
                        aData = []; }
                        const index1 = aData.findIndex(item => item.trackingNo === key.trim());
                        if (index1 >= 0) { aData.splice(index1, 1); }
                        aData.push(record);
                        this.storage.set('_archivePackages', aData).then(() => {
                        // this.loading.dismiss();
                        this.refreshList();
                     });
                   });
                  }
                });
              break;
              case 'del':
                  this.loading.present('Deleting...');
                  this.storage.get('_activePackages').then(tData => {
                      if (tData == null) {
                      tData = []; }
                      // tslint:disable-next-line: max-line-length
                      const index = tData.findIndex(item => item.trackingNo === key.trim());
                      if (index >= 0) {
                        this.trackService.deletePackage(keyItem[0]).subscribe(data => {
                        tData.splice(index, 1);
                        this.storage.set('_activePackages', tData).then(() => {
                          // this.loading.dismiss();
                          this.refreshList();
                       });
                      },
                      error => {
                        this.loading.dismiss();
                        this.loading.presentToast('error', 'Unable to delete!');
                      });
                       }
                    });
                  break;
                  case 'masd':
                      this.loading.present('Processing...');
                      this.storage.get('_activePackages').then(tData => {
                          if (tData == null) {
                          tData = []; }
                          // tslint:disable-next-line: max-line-length
                          const index = tData.findIndex(item => item.trackingNo === key.trim());
                          if (index >= 0) {
                            //this.trackService.MarkDeliveredPackage(keyItem[0],keyItem[1],'Delivered').subscribe(data => {
                            const record: any = tData.find(item => item.trackingNo === key.trim());
                            tData.splice(index, 1);
                            record.ResultData.Status = 'Delivered';
                            tData.push(record);
                            this.storage.set('_activePackages', tData).then(() => {
                              // this.loading.dismiss();
                              this.refreshList();
                           });
                          // },
                          // error => {
                          //   this.loading.presentToast('error', 'Unable to Mark!');
                          // });
                           }
                        });
                      break;
                      case 'rtrck':
                          const queryParam = new QueryParams();
                          const record = key.split('-');
                          console.log(record);
                          if (record.length === 2){
                            queryParam.TrackingNo = record[0];
                            queryParam.Carrier = record[1];
                            queryParam.Description = '';
                            queryParam.Residential = 'false';
                            this.trackService.getTrackingDetails(queryParam);
                          } else {
                            this.loading.presentToast('error', 'Invalid Packages to retract.');
                          }
                          break;

        }
      }
    }
  ]
});
await alert.present();
} catch (error) {
this.trackService.logError(error, 'presentConfirm-activePackage');
this.loading.presentToast('Error', 'Something went wrong!');
}
}

}
