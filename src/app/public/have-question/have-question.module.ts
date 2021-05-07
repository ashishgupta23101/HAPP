import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HaveQuestionPageRoutingModule } from './have-question-routing.module';

import { HaveQuestionPage } from './have-question.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule, SharedModule,
    HaveQuestionPageRoutingModule
  ],
  declarations: [HaveQuestionPage]
})
export class HaveQuestionPageModule {}
