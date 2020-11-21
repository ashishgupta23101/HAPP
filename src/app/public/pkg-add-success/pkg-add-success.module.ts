import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PkgAddSuccessPageRoutingModule } from './pkg-add-success-routing.module';

import { PkgAddSuccessPage } from './pkg-add-success.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    PkgAddSuccessPageRoutingModule
  ],
  declarations: [PkgAddSuccessPage]
})
export class PkgAddSuccessPageModule {}
