import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoCarrierPageRoutingModule } from './no-carrier-routing.module';

import { NoCarrierPage } from './no-carrier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoCarrierPageRoutingModule
  ],
  declarations: [NoCarrierPage]
})
export class NoCarrierPageModule {}
