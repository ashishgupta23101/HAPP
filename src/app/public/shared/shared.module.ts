import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';


@NgModule({
  declarations: [ SocialSharingComponent],
  entryComponents: [SocialSharingComponent],
  imports: [ IonicModule,
    CommonModule, FormsModule
  ],
  exports: [SocialSharingComponent]
})
export class SharedModule { }
