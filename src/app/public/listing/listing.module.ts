import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingPageRoutingModule } from './listing-routing.module';

import { ListingPage } from './listing.page';
import { OrderByPipe } from '../../pipe/order-by.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    ListingPageRoutingModule
  ],
  declarations: [ListingPage, OrderByPipe]
})
export class ListingPageModule {}
