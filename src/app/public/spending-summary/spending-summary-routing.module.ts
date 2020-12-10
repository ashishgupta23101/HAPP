import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpendingSummaryPage } from './spending-summary.page';

const routes: Routes = [
  {
    path: '',
    component: SpendingSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpendingSummaryPageRoutingModule {}
