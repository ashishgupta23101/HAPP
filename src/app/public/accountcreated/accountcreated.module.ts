import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountcreatedPageRoutingModule } from './accountcreated-routing.module';

import { AccountcreatedPage } from './accountcreated.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    AccountcreatedPageRoutingModule
  ],
  declarations: [AccountcreatedPage]
})
export class AccountcreatedPageModule {}
