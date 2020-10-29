import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsConfirmPage } from './notifications-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsConfirmPageRoutingModule {}
