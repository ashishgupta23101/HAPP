import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductActivityPage } from './product-activity.page';

const routes: Routes = [
  {
    path: '',
    component: ProductActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductActivityPageRoutingModule {}
