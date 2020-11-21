import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotRegisterPageRoutingModule } from './not-register-routing.module';

import { NotRegisterPage } from './not-register.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    NotRegisterPageRoutingModule
  ],
  declarations: [NotRegisterPage]
})
export class NotRegisterPageModule {}
