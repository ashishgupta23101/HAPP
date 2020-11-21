import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CusHomePageRoutingModule } from './cus-home-routing.module';

import { CusHomePage } from './cus-home.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    CusHomePageRoutingModule
  ],
  declarations: [CusHomePage]
})
export class CusHomePageModule {}
