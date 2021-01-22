import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingRetailerPage } from './listing-retailer.page';

const routes: Routes = [
  {
    path: '',
    component: ListingRetailerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingRetailerPageRoutingModule {}
