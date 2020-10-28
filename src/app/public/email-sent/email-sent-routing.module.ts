import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailSentPage } from './email-sent.page';

const routes: Routes = [
  {
    path: '',
    component: EmailSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailSentPageRoutingModule {}
