import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpendingSummaryPageRoutingModule } from './spending-summary-routing.module';

import { SpendingSummaryPage } from './spending-summary.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    SpendingSummaryPageRoutingModule
  ],
  declarations: [SpendingSummaryPage]
})
export class SpendingSummaryPageModule {}
