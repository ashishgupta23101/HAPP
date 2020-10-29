import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsConfirmPageRoutingModule } from './notifications-confirm-routing.module';

import { NotificationsConfirmPage } from './notifications-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsConfirmPageRoutingModule
  ],
  declarations: [NotificationsConfirmPage]
})
export class NotificationsConfirmPageModule {}
