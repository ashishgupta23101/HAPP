import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackageCarriersReportPageRoutingModule } from './package-carriers-report-routing.module';

import { PackageCarriersReportPage } from './package-carriers-report.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,SharedModule,
    IonicModule,
    PackageCarriersReportPageRoutingModule
  ],
  declarations: [PackageCarriersReportPage]
})
export class PackageCarriersReportPageModule {}
