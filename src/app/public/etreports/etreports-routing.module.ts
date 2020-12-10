import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ETReportsPage } from './etreports.page';

const routes: Routes = [
  {
    path: '',
    component: ETReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ETReportsPageRoutingModule {}
