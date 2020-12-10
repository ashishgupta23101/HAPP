import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ETReportsPageRoutingModule } from './etreports-routing.module';

import { ETReportsPage } from './etreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ETReportsPageRoutingModule
  ],
  declarations: [ETReportsPage]
})
export class ETReportsPageModule {}
