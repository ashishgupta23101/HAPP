import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChooseCarrierPageRoutingModule } from './choose-carrier-routing.module';

import { ChooseCarrierPage } from './choose-carrier.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    ReactiveFormsModule,
    ChooseCarrierPageRoutingModule
  ],
  declarations: [ChooseCarrierPage]
})
export class ChooseCarrierPageModule {}
