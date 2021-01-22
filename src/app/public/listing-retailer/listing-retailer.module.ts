import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingRetailerPageRoutingModule } from './listing-retailer-routing.module';

import { ListingRetailerPage } from './listing-retailer.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    ListingRetailerPageRoutingModule
  ],
  declarations: [ListingRetailerPage]
})
export class ListingRetailerPageModule {}
