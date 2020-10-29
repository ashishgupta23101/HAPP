import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailPageRoutingModule } from './list-detail-routing.module';

import { ListDetailPage } from './list-detail.page';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDetailPageRoutingModule
  ],
  entryComponents:[SocialSharingComponent],
  exports:[SocialSharingComponent],
  declarations: [ListDetailPage, SocialSharingComponent]
})
export class ListDetailPageModule {}
