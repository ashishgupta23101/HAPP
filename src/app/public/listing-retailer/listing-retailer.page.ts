import { Component, Inject, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/providers/functions.service';
import { TrackingService } from 'src/app/providers/tracking.service';

@Component({
  selector: 'app-listing-retailer',
  templateUrl: './listing-retailer.page.html',
  styleUrls: ['./listing-retailer.page.scss'],
})
export class ListingRetailerPage implements OnInit {
mailData : any;
  constructor(                 
  @Inject(FunctionsService) public fun: FunctionsService,
  @Inject(TrackingService) public trackService: TrackingService) {

   }

  ngOnInit() {
    this.trackService.getMessages(localStorage.getItem('accessToken')).subscribe(data => {
      // tslint:disable-next-line: no-debugger
       data.messages.forEach(element => {
         this.trackService.getMessagebyId(localStorage.getItem('accessToken'),element.id).subscribe(data => {
          // tslint:disable-next-line: no-debugger
          this.mailData = data;
          console.log(this.mailData);
        },
        error => {
         localStorage.setItem('IsLogin', 'false');
         this.fun.dismissLoader();
         this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
        });
       });
    },
    error => {
     localStorage.setItem('IsLogin', 'false');
     this.fun.dismissLoader();
     this.fun.presentToast('Invalid Login data!', true, 'bottom', 2100);
    });
  }

}
