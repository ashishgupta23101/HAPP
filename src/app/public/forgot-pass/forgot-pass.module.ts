import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPassPageRoutingModule } from './forgot-pass-routing.module';

import { ForgotPassPage } from './forgot-pass.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    ForgotPassPageRoutingModule
  ],
  declarations: [ForgotPassPage]
})
export class ForgotPassPageModule {}
