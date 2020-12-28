import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountForgotPassPage } from './account-forgot-pass.page';

const routes: Routes = [
  {
    path: '',
    component: AccountForgotPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountForgotPassPageRoutingModule {}
