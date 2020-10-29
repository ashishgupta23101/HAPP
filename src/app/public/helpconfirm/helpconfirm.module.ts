import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpconfirmPageRoutingModule } from './helpconfirm-routing.module';

import { HelpconfirmPage } from './helpconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpconfirmPageRoutingModule
  ],
  declarations: [HelpconfirmPage]
})
export class HelpconfirmPageModule {}
