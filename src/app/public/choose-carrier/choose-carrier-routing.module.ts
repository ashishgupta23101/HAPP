import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseCarrierPage } from './choose-carrier.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseCarrierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseCarrierPageRoutingModule {}
