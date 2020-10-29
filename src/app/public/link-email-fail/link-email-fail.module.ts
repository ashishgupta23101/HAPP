import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkEmailFailPageRoutingModule } from './link-email-fail-routing.module';

import { LinkEmailFailPage } from './link-email-fail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkEmailFailPageRoutingModule
  ],
  declarations: [LinkEmailFailPage]
})
export class LinkEmailFailPageModule {}
