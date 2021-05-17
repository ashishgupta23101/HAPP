import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/providers/loader.service';
import { Configuration } from 'src/app/models/configuration';
import { Storage } from '@ionic/storage';
import { TrackingService } from 'src/app/providers/tracking.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  // tslint:disable-next-line: variable-name
  setting_Form: FormGroup;
  constructor(@Inject(NavController) private navCtrl: NavController,
              @Inject(TrackingService) private trackService: TrackingService,
              @Inject(Router) private router: Router,
              @Inject(Storage) private storage: Storage,
              @Inject(FormBuilder) public formBuilder: FormBuilder,
              @Inject(LoaderService) private loadingController: LoaderService) { }

  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.fillForm();
  }
  saveSettings(value){
    try {
      this.loadingController.present('Saving Configuration.');
      let _config = new Configuration();
          _config.DeliveredScan = value.Delivered;
          _config.PickUpScan = value.PickUp;
          _config.OutForDeliveryScan = value.OutforDelivery;
          _config.NoFinalDelivery = value.NFDeliveryStaus;
          _config.Damages = value.Damages ? 1 : 0;
          _config.WeatherDelay = value.Weather ? 1 : 0;
          this.trackService.saveDeviceConfiguration(_config).subscribe(data => {
            // tslint:disable-next-line: no-debugger
            if(data.Error === true)
            {
              this.loadingController.dismiss();
              this.trackService.logError(JSON.stringify(data.Message),'saveSettings');
              this.loadingController.presentToast('Error',data.Message);
              return;
            }
            // Tracking Response
            this.storage.set('_deviceConfig', _config);
            this.loadingController.presentToast('Info', 'Settings saved successfully');
            this.loadingController.dismiss();
          },
          error => {
            this.trackService.logError(JSON.stringify(error),'saveSettings');
            this.loadingController.presentToast('Error', 'Something went wrong in API request');
            this.loadingController.dismiss();
          });


    } catch (Exception) {
      this.trackService.logError(JSON.stringify(Exception),'saveSettings');
      this.loadingController.presentToast('Error', 'Something went wrong!');
      this.loadingController.dismiss();
    }
  }

  refresh(config = new Configuration()) {
      this.setting_Form = this.formBuilder.group({
      PickUp: new FormControl(config.PickUpScan),
      OutforDelivery: new FormControl(config.OutForDeliveryScan),
      Delivered : new FormControl(config.DeliveredScan),
      NFDeliveryStaus: new FormControl(config.NoFinalDelivery),
      Damages: new FormControl(config.Damages === 1 ? true : false),
      Weather: new FormControl(config.WeatherDelay === 1 ? true : false)
    });
  }
  fillForm() {
    this.storage.get('_deviceConfig').then(result => {
      let config  = new Configuration();
      if (result !== null && result !== undefined) {
        config = result;
      }
      this.refresh(config);
    });
  }
}

