import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetailAccountPageRoutingModule } from './retail-account-routing.module';

import { RetailAccountPage } from './retail-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetailAccountPageRoutingModule
  ],
  declarations: [RetailAccountPage]
})
export class RetailAccountPageModule {}
