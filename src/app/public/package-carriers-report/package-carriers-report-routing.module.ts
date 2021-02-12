import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageCarriersReportPage } from './package-carriers-report.page';

const routes: Routes = [
  {
    path: '',
    component: PackageCarriersReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageCarriersReportPageRoutingModule {}
