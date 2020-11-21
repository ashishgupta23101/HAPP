import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkEmailFailPageRoutingModule } from './link-email-fail-routing.module';

import { LinkEmailFailPage } from './link-email-fail.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, SharedModule,
    IonicModule,
    LinkEmailFailPageRoutingModule
  ],
  declarations: [LinkEmailFailPage]
})
export class LinkEmailFailPageModule {}
