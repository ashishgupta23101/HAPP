import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkEmailACPage } from './link-email-ac.page';

const routes: Routes = [
  {
    path: '',
    component: LinkEmailACPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkEmailACPageRoutingModule {}
