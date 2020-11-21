import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
import { FooterComponent } from 'src/app/component/footer/footer.component';


@NgModule({
  declarations: [ SocialSharingComponent, FooterComponent],
  entryComponents: [SocialSharingComponent, FooterComponent],
  imports: [ IonicModule,
    CommonModule, FormsModule
  ],
  exports: [SocialSharingComponent, FooterComponent]
})
export class SharedModule { }
