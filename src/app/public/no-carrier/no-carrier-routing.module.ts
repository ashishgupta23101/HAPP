import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoCarrierPage } from './no-carrier.page';

const routes: Routes = [
  {
    path: '',
    component: NoCarrierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoCarrierPageRoutingModule {}
