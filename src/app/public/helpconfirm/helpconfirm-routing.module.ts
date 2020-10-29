import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpconfirmPage } from './helpconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: HelpconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpconfirmPageRoutingModule {}
