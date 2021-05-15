
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { ActivePackages, Packages, SessionData } from 'src/app/models/active-packages';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationExtras, Router } from '@angular/router';
import { QueryParams } from 'src/app/models/QueryParams';
import { TrackingService } from 'src/app/providers/tracking.service';
import * as $ from 'jquery';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
import { element } from 'protractor';
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
     
    
  }
  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;
public searchTerm = '';
// tslint:disable-next-line: variable-name
mainMenu = true;
_data : Array<any>;
carrierMenu = false;
statusMenu = false;
dateMenu = false;
IsFilter = false;
public sortbyDate = 'Date Created';
public sessionData: any;
public filtBy: string;
public segmentModel: string;
public sortBy;
public Issidemenu : string = 'Filter';
public dateSelected: any = formatDate(new Date(), 'MM/dd/yyyy', 'en');
public activeItems: Array<ActivePackages>;
public searchItems: Array<any>;
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
ngOnInit() {}


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
  {name:'None',value:'none'}
 // {name:'Retailer',value:'retail'},
 // {name:'Category',value:'cate'}
]
clearall(){
  this.IsFilter = false;
  this.activeItems = SessionData.packages.All;
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
  //this.loading.present('Applying sorting..');
  this.sortBy = event.detail.value;
  this.sortedBy();

}


radioSelect(event) {
  debugger;
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
  debugger;
  try{
  this.searchItems =[];
  this.menuback();
  this.menuCtrl.toggle();
 if(!(this.Carrier.dhl || this.Carrier.ups || this.Carrier.usps || this.Carrier.fedex || this.Carrier.ontrack || this.Carrier.purolator))
  { 
    if(!(this.Status.delivered || this.Status.intransit || this.Status.exception))
    {
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth);
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek);
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth);
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek);
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today);
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday);
         }
      }
    }else{
      if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
     { 
      if (this.Status.delivered){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Status.toLowerCase().includes('deliver')));
      }
      if (this.Status.intransit){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
           u.Status.toLowerCase().includes('transit')));
      }
      if (this.Status.exception){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Status.toLowerCase().includes('exception')));
      }
      
    }else{
    if (this.Status.delivered){ 
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
            u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
            u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
            u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
            u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
            u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
            u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
          u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
            u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
            u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
            u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
            u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
            u.Status.toLowerCase().includes('exception')));
         }
      }
    }
  }
  }
    
  }else{
  if (this.Carrier.dhl){
    if(!(this.Status.delivered || this.Status.intransit || this.Status.exception))
    {this.searchItems.push(this.sessionData.packages.All.filter(u =>
      u.Carrier?.toLowerCase().includes('d')));
    }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
    { 
      if (this.Status.delivered){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
      }
      if (this.Status.intransit){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
      }
      if (this.Status.exception){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('exception')));
      }
      
    }else{
    if (this.Status.delivered){ 
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }
  }
  }     
  if (this.Carrier.ups){
    if(!(this.Status.delivered || this.Status.intransit || this.Status.exception))
    {this.searchItems.push(this.sessionData.packages.All.filter(u =>
      u.Carrier.toLowerCase().includes('u')));
    }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
    { 
      if (this.Status.delivered){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
      }
      if (this.Status.intransit){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
      }
      if (this.Status.exception){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('exception')));
      }
      
    }else{
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }}
  }
  if (this.Carrier.usps){
    if(!(this.Status.delivered || this.Status.intransit || this.Status.exception))
    {this.searchItems.push(this.sessionData.packages.All.filter(u =>
      u.Carrier.toLowerCase().includes('s')));
    }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
    { 
      if (this.Status.delivered){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
      }
      if (this.Status.intransit){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
      }
      if (this.Status.exception){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('exception')));
      }
      
    }else{
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }}
  }
  if (this.Carrier.fedex){
    if(!(this.Status.delivered || this.Status.intransit || this.Status.exception))
    {this.searchItems.push(this.sessionData.packages.All.filter(u =>
      u.Carrier.toLowerCase().includes('f')));
    }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
    { 
      if (this.Status.delivered){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
      }
      if (this.Status.intransit){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
      }
      if (this.Status.exception){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('exception')));
      }
      
    }else{
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }}
  }
  if (this.Carrier.ontrack){
    if(!(this.Status.delivered || this.Status.intransit || this.Status.exception))
    {this.searchItems.push(this.sessionData.packages.All.filter(u =>
      u.Carrier.toLowerCase().includes('o')));
    }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
    { 
      if (this.Status.delivered){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
      }
      if (this.Status.intransit){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
      }
      if (this.Status.exception){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('exception')));
      }
      
    }else{
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }}
  }
  if (this.Carrier.purolator){
    if(!(this.Status.delivered || this.Status.intransit || this.Status.exception))
    {this.searchItems.push(this.sessionData.packages.All.filter(u =>
      u.Carrier.toLowerCase().includes('p')));
    }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
    { 
      if (this.Status.delivered){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
      }
      if (this.Status.intransit){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
      }
      if (this.Status.exception){
        this.searchItems.push(this.sessionData.packages.All.filter(u =>
          u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('exception')));
      }
      
    }else{
    if (this.Status.delivered){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
         }
      }
    }
    if (this.Status.intransit){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
         }
      }
    }
    if (this.Status.exception){
      if (this.Date.lastmonth){
        this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.lastweek){
        this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('exception')));
       }
      if (this.Date.thismonth){
        this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('exception')));
       }else if (this.Date.thisweek){
        this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('exception')));
       }else {
         if (this.Date.today){
          this.searchItems.push(this.sessionData.packages.Today.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('exception')));
         }
         if (this.Date.yesterday){
          this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
           u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('exception')));
         }
      }
    }}
  }
}
  if(this.searchItems.length == 0){
    //this.activeItems = SessionData.packages.All;
    this.IsFilter = false;
  }else{
    this.activeItems =[];
    this.searchItems.forEach(arry=>{
      if(arry.length >0){
        arry.forEach(element=>{
          this.activeItems.push(element);
        });
      }
    });
    
    this.IsFilter = true;
  }
  this.readyToLoad = true;
  this.loading.dismiss();
}catch(ex)
{
  console.log(ex);
  this.loading.dismiss();}
}
menuback(){
  this.filterName = 'Filter by';
  this.mainMenu = true;
  this.carrierMenu = false;
  this.statusMenu = false;
  this.dateMenu = false;
}
ionViewWillEnter(){
 // this.segmentChanged() ;
 const cusHome = localStorage.getItem('cusHome');
  this.activeItems = [];
  if (cusHome !== null && cusHome !== 'null' && cusHome !== undefined && cusHome !== ''  && cusHome === 'hp') {
    this.segmentModel = 'history';
   }else{
     this.segmentModel = 'active';
   }
  // this.segmentChanged();
  
 // this.segmentChanged();
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
ionViewDidEnter(){
  this.segmentChanged();
}
segmentChanged() {
  SessionData.packages = new  Packages();
  this._data =[];
  this.activeItems = [];
  this.storage.get('_allPackages').then((value) => {
    if (value !== undefined && value !== '' && value !== null){
      switch (this.segmentModel) {
        case 'active':
          this._data = value.filter(u =>u.type === 'act');
          this.trackService.setPackagestoSession(this._data);
          break;
        case 'history':
          this._data = value.filter(u =>u.type === 'arc');
          this.trackService.setarchivePackagestoSession(this._data);
          break;
      }
    this.sessionData = SessionData;
    if(this.IsFilter){
      this.apply();
    }else{
      this.activeItems = SessionData.packages.All;
    }
    this.sortedBy();
    }
    this.readyToLoad = true;
 });
}
sortedBy() {
  debugger;
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
 // this.loading.dismiss();
}catch(e){
 // this.loading.dismiss(); 
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
revert(key: string) {
  this.presentConfirm(key, 'Undo', 'Do you want to undo the package?', 'undo');
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
  const val1 = this._data.find(item => item.trackingNo === key);
  if (val1 !== undefined && val1 !== '' && val1 !== null && val1.Scans.length > 0) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          scans: JSON.stringify(val1.Scans)
      }
  };
    this.router.navigate(['product-activity'], navigationExtras);
  } else {
    this.loading.presentToast('Warning', 'No Scans to Locate.');
  }
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
              this.storage.get('_allPackages').then(tData => {
                  if (tData == null) {
                  tData = []; }
                  // tslint:disable-next-line: max-line-length
                  const index = tData.findIndex(item => item.trackingNo === key.trim());
                  if (index >= 0) {
                    this.trackService.archivePackage(keyItem[0],keyItem[1],false).subscribe(data => {
                    // tslint:disable-next-line: no-shadowed-variable
                    const record: any = tData.find(item => item.trackingNo === key.trim());
                    tData.splice(index, 1);
                    record.type = 'arc';
                    tData.push(record);
                    this.storage.set('_allPackages', tData);
                    this.refreshList();
                     },
                      error => {
                        this.loading.presentToast('error', 'Unable to Archive!');
                      });
                    
                  }
                });
              break;
              case 'undo':
                this.loading.present('undo...');
                this.storage.get('_allPackages').then(tData => {
                    if (tData == null) {
                    tData = []; }
                    // tslint:disable-next-line: max-line-length
                    const index = tData.findIndex(item => item.trackingNo === key.trim());
                    if (index >= 0) {
                      this.trackService.archivePackage(keyItem[0],keyItem[1],true).subscribe(data => {
                        // tslint:disable-next-line: no-shadowed-variable
                      const record: any = tData.find(item => item.trackingNo === key.trim());
                      tData.splice(index, 1);
                      record.type = 'act';
                      tData.push(record);
                      this.storage.set('_allPackages', tData);
                      this.refreshList();
                       },
                        error => {
                          this.loading.dismiss();
                          this.loading.presentToast('error', 'Unable to undo Archived package!');
                        });
                      
                    }
                  });
                break;
              case 'del':
                  this.loading.present('Deleting...');
                  this.storage.get('_allPackages').then(tData => {
                      if (tData == null) {
                      tData = []; }
                      // tslint:disable-next-line: max-line-length
                      const index = tData.findIndex(item => item.trackingNo === key.trim());
                      if (index >= 0) {
                        this.trackService.deletePackage(keyItem[0],keyItem[1]).subscribe(data => {
                        tData.splice(index, 1);
                        this.storage.set('_allPackages', tData).then(() => {
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
                      this.storage.get('_allPackages').then(tData => {
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
                            this.storage.set('_allPackages', tData).then(() => {
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
