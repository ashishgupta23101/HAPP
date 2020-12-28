import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountUnlinkPage } from './account-unlink.page';

const routes: Routes = [
  {
    path: '',
    component: AccountUnlinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountUnlinkPageRoutingModule {}
