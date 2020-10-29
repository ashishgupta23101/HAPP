import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkEmailAcPage } from './link-email-ac.page';

const routes: Routes = [
  {
    path: '',
    component: LinkEmailAcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkEmailAcPageRoutingModule {}
