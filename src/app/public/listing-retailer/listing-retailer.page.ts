import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MailData } from 'src/app/models/MailData';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-listing-retailer',
  templateUrl: './listing-retailer.page.html',
  styleUrls: ['./listing-retailer.page.scss'],
})
export class ListingRetailerPage implements OnInit {

  lastMailData : Array<MailData>;
  mailData : MailData = new MailData();
  loaded: boolean = false;
  constructor(                 
  @Inject(FunctionsService) public fun: FunctionsService,
  @Inject(TrackingService) public trackService: TrackingService,
  @Inject(NavController) private navCtrl: NavController) {
    
   }
  goBack() {
    this.navCtrl.navigateForward(`/link-email-ac`);
  }
  showMail(item){
   // alert(item.subject);
    this.mailData = item;
    $('#modelopen1').click();
  }
  ngOnInit() {
    this.lastMailData = [];
    this.trackService.getMessages(localStorage.getItem('accessToken')).subscribe(data => {
      // tslint:disable-next-line: no-debugger
       data.messages.forEach(element => {
         this.trackService.getMessagebyId(localStorage.getItem('accessToken'),element.id).subscribe(data => {
          // tslint:disable-next-line: no-debugger
          if(data){
            let md = new MailData(); 
            var  subData =   data.payload.headers.filter(val => val.name === 'Subject' && (val.value.toLowerCase().includes('order') 
            || val.value.toLowerCase().includes('your package')
            || val.value.toLowerCase().includes('your return')));
            if(subData.length > 0){
              var  fromData = data.payload.headers.filter(val => val.name === 'From');
              md.subject = subData[0].value;
              md.from = fromData.length > 0?fromData[0].value:'NA';
              this.lastMailData.push(md)
            }
          }
        },
        error => {
         this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
        });

       });
       console.log(this.lastMailData);
    },
    error => {
      if(error.status === 401)
      {
        localStorage.setItem('accessToken', 'NA');
        this.fun.presentToast('Unauthenticated Request!', true, 'bottom', 2100);
        this.goBack();
      }
    
    });
  }

}
