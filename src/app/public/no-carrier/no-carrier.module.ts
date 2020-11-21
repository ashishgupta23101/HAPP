import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoCarrierPageRoutingModule } from './no-carrier-routing.module';

import { NoCarrierPage } from './no-carrier.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    NoCarrierPageRoutingModule
  ],
  declarations: [NoCarrierPage]
})
export class NoCarrierPageModule {}
