import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
import { FooterComponent } from 'src/app/component/footer/footer.component';
import { InfoModelComponent } from 'src/app/component/info-model/info-model.component';


@NgModule({
  declarations: [ SocialSharingComponent, FooterComponent, InfoModelComponent],
  entryComponents: [SocialSharingComponent, FooterComponent, InfoModelComponent],
  imports: [ IonicModule,
    CommonModule, FormsModule
  ],
  exports: [SocialSharingComponent, FooterComponent,InfoModelComponent]
})
export class SharedModule { }
