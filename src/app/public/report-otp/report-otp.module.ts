import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportOtpPageRoutingModule } from './report-otp-routing.module';

import { ReportOtpPage } from './report-otp.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    ReportOtpPageRoutingModule
  ],
  declarations: [ReportOtpPage]
})
export class ReportOtpPageModule {}
