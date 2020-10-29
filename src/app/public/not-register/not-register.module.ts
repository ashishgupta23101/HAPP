import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotRegisterPageRoutingModule } from './not-register-routing.module';

import { NotRegisterPage } from './not-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotRegisterPageRoutingModule
  ],
  declarations: [NotRegisterPage]
})
export class NotRegisterPageModule {}
