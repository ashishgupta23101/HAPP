import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductActivityPageRoutingModule } from './product-activity-routing.module';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
import { ProductActivityPage } from './product-activity.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    ProductActivityPageRoutingModule
  ],
  declarations: [ProductActivityPage]
})
export class ProductActivityPageModule {}
