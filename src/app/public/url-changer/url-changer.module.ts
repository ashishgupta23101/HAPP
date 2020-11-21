import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UrlChangerPageRoutingModule } from './url-changer-routing.module';

import { UrlChangerPage } from './url-changer.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    UrlChangerPageRoutingModule
  ],
  declarations: [UrlChangerPage]
})
export class UrlChangerPageModule {}
