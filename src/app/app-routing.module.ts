import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  } ,{
    path: 'notification',
    loadChildren: () => import('./public/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'link-email-ac',
    loadChildren: () => import('./public/link-email-ac/link-email-ac.module').then( m => m.LinkEmailACPageModule)
  },
  {
    path: 'pkg-add-success',
    loadChildren: () => import('./public/pkg-add-success/pkg-add-success.module').then( m => m.PkgAddSuccessPageModule)
  },
  {
    path: 'listing',
    loadChildren: () => import('./public/listing/listing.module').then( m => m.ListingPageModule)
  },
  {
    path: 'accountcreated',
    loadChildren: () => import('./public/accountcreated/accountcreated.module').then( m => m.AccountcreatedPageModule)
  },
  {
    path: 'cus-home',
    loadChildren: () => import('./public/cus-home/cus-home.module').then( m => m.CusHomePageModule)
  },
  {
    path: 'email-sent',
    loadChildren: () => import('./public/email-sent/email-sent.module').then( m => m.EmailSentPageModule)
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./public/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  {
    path: 'no-carrier',
    loadChildren: () => import('./public/no-carrier/no-carrier.module').then( m => m.NoCarrierPageModule)
  },
  {
    path: 'choose-carrier',
    loadChildren: () => import('./public/choose-carrier/choose-carrier.module').then( m => m.ChooseCarrierPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
