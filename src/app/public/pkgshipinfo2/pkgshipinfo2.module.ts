import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pkgshipinfo2PageRoutingModule } from './pkgshipinfo2-routing.module';

import { Pkgshipinfo2Page } from './pkgshipinfo2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pkgshipinfo2PageRoutingModule
  ],
  declarations: [Pkgshipinfo2Page]
})
export class Pkgshipinfo2PageModule {}
