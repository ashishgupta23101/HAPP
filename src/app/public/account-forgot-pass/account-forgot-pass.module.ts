import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountForgotPassPageRoutingModule } from './account-forgot-pass-routing.module';

import { AccountForgotPassPage } from './account-forgot-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountForgotPassPageRoutingModule
  ],
  declarations: [AccountForgotPassPage]
})
export class AccountForgotPassPageModule {}
