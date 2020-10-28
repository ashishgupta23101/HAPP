import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountcreatedPageRoutingModule } from './accountcreated-routing.module';

import { AccountcreatedPage } from './accountcreated.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountcreatedPageRoutingModule
  ],
  declarations: [AccountcreatedPage]
})
export class AccountcreatedPageModule {}
