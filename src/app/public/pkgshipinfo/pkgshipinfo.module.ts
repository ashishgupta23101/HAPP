import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PkgshipinfoPageRoutingModule } from './pkgshipinfo-routing.module';

import { PkgshipinfoPage } from './pkgshipinfo.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    PkgshipinfoPageRoutingModule
  ],
  declarations: [PkgshipinfoPage]
})
export class PkgshipinfoPageModule {}
