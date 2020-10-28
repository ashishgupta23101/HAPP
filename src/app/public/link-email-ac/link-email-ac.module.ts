import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkEmailACPageRoutingModule } from './link-email-ac-routing.module';

import { LinkEmailACPage } from './link-email-ac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkEmailACPageRoutingModule
  ],
  declarations: [LinkEmailACPage]
})
export class LinkEmailACPageModule {}
