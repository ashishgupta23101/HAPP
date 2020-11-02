import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailPageRoutingModule } from './list-detail-routing.module';

import { ListDetailPage } from './list-detail.page';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    ListDetailPageRoutingModule
  ],
  declarations: [ListDetailPage]
})
export class ListDetailPageModule {}
