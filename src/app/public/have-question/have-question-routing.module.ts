import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HaveQuestionPage } from './have-question.page';

const routes: Routes = [
  {
    path: '',
    component: HaveQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HaveQuestionPageRoutingModule {}
