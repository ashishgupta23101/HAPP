import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PkgAddSuccessPage } from './pkg-add-success.page';

const routes: Routes = [
  {
    path: '',
    component: PkgAddSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PkgAddSuccessPageRoutingModule {}
