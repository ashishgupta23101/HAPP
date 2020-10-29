import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetailAccountPage } from './retail-account.page';

const routes: Routes = [
  {
    path: '',
    component: RetailAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetailAccountPageRoutingModule {}
