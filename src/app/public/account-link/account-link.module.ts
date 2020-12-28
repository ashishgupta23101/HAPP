import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountLinkPageRoutingModule } from './account-link-routing.module';

import { AccountLinkPage } from './account-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountLinkPageRoutingModule
  ],
  declarations: [AccountLinkPage]
})
export class AccountLinkPageModule {}
