import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailSentPageRoutingModule } from './email-sent-routing.module';

import { EmailSentPage } from './email-sent.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    EmailSentPageRoutingModule
  ],
  declarations: [EmailSentPage]
})
export class EmailSentPageModule {}
