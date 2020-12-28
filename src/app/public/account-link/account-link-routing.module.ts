import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountLinkPage } from './account-link.page';

const routes: Routes = [
  {
    path: '',
    component: AccountLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountLinkPageRoutingModule {}
