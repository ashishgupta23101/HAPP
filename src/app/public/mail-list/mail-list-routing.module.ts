import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailListPage } from './mail-list.page';

const routes: Routes = [
  {
    path: '',
    component: MailListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailListPageRoutingModule {}
