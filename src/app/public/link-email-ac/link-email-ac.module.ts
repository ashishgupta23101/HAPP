import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkEmailAcPageRoutingModule } from './link-email-ac-routing.module';

import { LinkEmailAcPage } from './link-email-ac.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    LinkEmailAcPageRoutingModule
  ],
  declarations: [LinkEmailAcPage]
})
export class LinkEmailAcPageModule {}
