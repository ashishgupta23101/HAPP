import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetailAcUserPageRoutingModule } from './retail-ac-user-routing.module';

import { RetailAcUserPage } from './retail-ac-user.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    RetailAcUserPageRoutingModule
  ],
  declarations: [RetailAcUserPage]
})
export class RetailAcUserPageModule {}
