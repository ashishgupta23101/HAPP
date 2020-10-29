import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pkgshipinfo2Page } from './pkgshipinfo2.page';

const routes: Routes = [
  {
    path: '',
    component: Pkgshipinfo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pkgshipinfo2PageRoutingModule {}
