import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChooseCarrierPageRoutingModule } from './choose-carrier-routing.module';

import { ChooseCarrierPage } from './choose-carrier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChooseCarrierPageRoutingModule
  ],
  declarations: [ChooseCarrierPage]
})
export class ChooseCarrierPageModule {}
