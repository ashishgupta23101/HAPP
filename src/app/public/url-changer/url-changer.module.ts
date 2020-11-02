import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UrlChangerPageRoutingModule } from './url-changer-routing.module';

import { UrlChangerPage } from './url-changer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UrlChangerPageRoutingModule
  ],
  declarations: [UrlChangerPage]
})
export class UrlChangerPageModule {}
