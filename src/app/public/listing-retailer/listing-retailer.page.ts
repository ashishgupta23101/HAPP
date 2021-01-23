import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MailData } from 'src/app/models/MailData';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-listing-retailer',
  templateUrl: './listing-retailer.page.html',
  styleUrls: ['./listing-retailer.page.scss'],
})
export class ListingRetailerPage implements OnInit {

  mailData : Array<MailData>;
  constructor(                 
  @Inject(FunctionsService) public fun: FunctionsService,
  @Inject(TrackingService) public trackService: TrackingService,
  @Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.mailData = [];
    this.trackService.getMessages(localStorage.getItem('accessToken')).subscribe(data => {
      // tslint:disable-next-line: no-debugger
       data.messages.forEach(element => {
         this.trackService.getMessagebyId(localStorage.getItem('accessToken'),element.id).subscribe(data => {
          // tslint:disable-next-line: no-debugger
          if(data){
           
            debugger;
            let md = new MailData(); 
            // for (let i = 0; i < data.payload.headers.length; i++) {
            //   let val = data.payload.headers[i];
            //   if(val.name === 'Subject' && (val.value.toLowerCase().includes('order') 
            //   || val.value.toLowerCase().includes('your package')
            //   || val.value.toLowerCase().includes('your return') )){
            //     md.subject = val.value ;
                
            //   }
            // }
            data.payload.headers.forEach(val => {
              
              if(val.name === 'Subject' && (val.value.toLowerCase().includes('order') 
              || val.value.toLowerCase().includes('your package')
              || val.value.toLowerCase().includes('your return'))){
                md.subject = val.value;
                md.from = 'NA';
                this.mailData.push(md)
              }
            });
          }
          
        },
        error => {
         localStorage.setItem('IsLogin', 'false');
         this.fun.dismissLoader();
         this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
        });

       });
       console.log(this.mailData);
    },
    error => {
      debugger;
      if(error.status === 401)
      {
        this.fun.dismissLoader();
        localStorage.setItem('IsLogin', 'false');
        localStorage.setItem('accessToken', 'NA');
        this.fun.presentToast('Unauthenticated request! Please login', true, 'bottom', 2100);
        this.goBack();
      }
     
     this.fun.dismissLoader();
     this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
    });
  }

}
