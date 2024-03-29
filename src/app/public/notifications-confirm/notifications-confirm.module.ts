import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsConfirmPageRoutingModule } from './notifications-confirm-routing.module';

import { NotificationsConfirmPage } from './notifications-confirm.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    NotificationsConfirmPageRoutingModule
  ],
  declarations: [NotificationsConfirmPage]
})
export class NotificationsConfirmPageModule {}
