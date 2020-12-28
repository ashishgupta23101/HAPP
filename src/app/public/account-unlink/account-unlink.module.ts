import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountUnlinkPageRoutingModule } from './account-unlink-routing.module';

import { AccountUnlinkPage } from './account-unlink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountUnlinkPageRoutingModule
  ],
  declarations: [AccountUnlinkPage]
})
export class AccountUnlinkPageModule {}
