import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotRegisterPage } from './not-register.page';

const routes: Routes = [
  {
    path: '',
    component: NotRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotRegisterPageRoutingModule {}
