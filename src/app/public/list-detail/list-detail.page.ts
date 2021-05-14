import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, PopoverController, AlertController } from '@ionic/angular';
import { TrackingHeader } from 'src/app/models/TrackingHeader';
import { TrackingScans } from 'src/app/models/TrackingScans';
import { Storage } from '@ionic/storage';
import { TrackingResult } from 'src/app/models/TrackingResult';
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
trackingResult: TrackingResult;
trackingheader: TrackingHeader;
trackNo: any ;
selectedData: any;
@ViewChild(SocialSharingComponent) social: SocialSharingComponent;
// async presentPopover(ev: any) {
// const popover = await this.popoverCtrl.create({
// component: PopoverDetailPage,
// event: ev,
// componentProps: { 'trackNo': this.trackNo,
// 'Popover': this.popoverCtrl
// },
// translucent: true
// });
// popover.onDidDismiss().then((data) => {
// if(data != null) {
// switch(data.data){
// case 'archive':
//   this.archive();
// break;
// case 'MarkasDelievered':
//   this.MarkasDelievered();
// break;
// case 'locate':
//   this.locate();
// break;
// case 'gotoSettings':
//   this.gotoSettings();
// break;
// case 'delete':
//   this.delete();
// break;
// case 'share':
//   this.share();
// break;
// }
// }
// });
// return await popover.present();
// }
ngOnInit() {
  // tslint:disable-next-line: no-debugger
  this.trackNo = this.route.snapshot.paramMap.get('any');
}
ionViewWillEnter(){
  // this.loading.present('Loading Details.');
  this.item = new ActivePackages();
  this.trackingheader = new TrackingHeader();
  this.trackingResult = new TrackingResult();
  this.trackingScans = new Array<TrackingScans>();
  this.storage.get('_allPackages').then(tData => {
const val = tData.find(item => item.trackingNo === this.trackNo);
if (val !== undefined && val !== '' && val !== null){

this.trackingScans = val.Scans;
this.trackingResult = val.ResultData;
this.trackingheader = val.TrackingHeader;
this.item.TrackingNo = val.TrackingHeader.TrackingNo;
this.item.Carrier = val.TrackingHeader.Carrier;
this.item.Status = val.ResultData.Status;
this.hasData = true;
// this.loading.dismiss();
} else{
this.hasData = false;
// this.loading.dismiss();
}

});
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

archive() {
this.presentConfirm(this.trackNo, 'Archive', 'Do you want to archive the package?', 'arc');
}
retrack() {
this.presentConfirm(this.trackNo, 'Re-Track', 'Do you want to Re-Track the package?', 'rtrck');
}
delete() {
this.presentConfirm(this.trackNo, 'Delete', 'Do you want to delete the package?', 'del');
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

MarkasDelievered() {
this.presentConfirm(this.trackNo, 'Mark as Delivered', 'Do you want to mark the package delivered?', 'masd');
}

editPackages() {
this.navCtrl.navigateForward(`/edit-package/${this.trackNo}`);
}

gotoSettings() {
this.navCtrl.navigateForward('/settings');
}

gotoHelp() {
this.navCtrl.navigateForward('/help');
}

refPackages() {
this.presentConfirm(this.trackNo, 'Re-Track', 'Do you want to Re-Track the package?', 'rtrck');
}

// tslint:disable-next-line: variable-name
async presentConfirm(key: string , _header: string, _message: string, _opration: string) {
try{
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
          this.loading.present('Archived...');
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
                 },
                  error => {
                    this.loading.presentToast('error', 'Unable to Archive!');
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
                    tData.splice(index, 1);
                    this.storage.set('_allPackages', tData).then(() => {
                        this.gotoActivePackages();
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
                        const record: any = tData.find(item => item.trackingNo === key.trim());
                        tData.splice(index, 1);
                        record.ResultData.Status = 'Delivered';
                        tData.push(record);
                        this.storage.set('_allPackages', tData).then(() => {
                          this.gotoActivePackages();
                       });
                      }
                    });
                  break;
                  case 'rtrck':
                   // this.loading.present('Re-Tracking...');
                    this.storage.get('_allPackages').then(tData => {
                        if (tData == null) {
                        tData = []; }
                        // tslint:disable-next-line: max-line-length
                        const index = tData.findIndex(item => item.trackingNo === key.trim());
                        if (index >= 0) {
                          const record: any = tData.find(item => item.trackingNo === key.trim());
                          tData.splice(index, 1);
                          this.storage.set('_allPackages', tData).then(() => {
                          const queryParam = new QueryParams();
                          queryParam.TrackingNo = record.TrackingHeader.TrackingNo;
                          queryParam.Carrier = record.TrackingHeader.Carrier;
                          queryParam.Description = record.ResultData.Description;
                          queryParam.Residential = record.ResultData.Residential;
                          this.trackService.getTrackingDetails(queryParam, 'actpck');
                         });
                         }
                      });
                    break;
    }
  }
}
]
});
await alert.present();
} catch (Exception) {
this.trackService.logError(JSON.stringify(Exception), 'presentConfirm-details');
this.loading.presentToast('Error', 'Something went wrong!');
} finally {
this.loading.dismiss();
}
}
}


