import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CusHomePage } from './cus-home.page';

const routes: Routes = [
  {
    path: '',
    component: CusHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CusHomePageRoutingModule {}
