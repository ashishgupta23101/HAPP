import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailListPageRoutingModule } from './mail-list-routing.module';

import { MailListPage } from './mail-list.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    MailListPageRoutingModule
  ],
  declarations: [MailListPage]
})
export class MailListPageModule {}
