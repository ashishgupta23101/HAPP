import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PkgshipinfoPageRoutingModule } from './pkgshipinfo-routing.module';

import { PkgshipinfoPage } from './pkgshipinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PkgshipinfoPageRoutingModule
  ],
  declarations: [PkgshipinfoPage]
})
export class PkgshipinfoPageModule {}
