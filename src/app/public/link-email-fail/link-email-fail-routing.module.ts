import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkEmailFailPage } from './link-email-fail.page';

const routes: Routes = [
  {
    path: '',
    component: LinkEmailFailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkEmailFailPageRoutingModule {}
