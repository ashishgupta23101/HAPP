import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetailAcUserPage } from './retail-ac-user.page';

const routes: Routes = [
  {
    path: '',
    component: RetailAcUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetailAcUserPageRoutingModule {}
