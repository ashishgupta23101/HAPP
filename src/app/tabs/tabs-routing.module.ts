import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'register',
        loadChildren: () => import('../auth/register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../auth/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: '',
        loadChildren: () => import('../public/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../public/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('../public/welcome/welcome.module').then( m => m.WelcomePageModule)
      },
      {
        path: 'splash',
        loadChildren: () => import('../public/splash/splash.module').then( m => m.SplashPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../public/notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'link-email-ac',
        loadChildren: () => import('../public/link-email-ac/link-email-ac.module').then( m => m.LinkEmailACPageModule)
      },
      {
        path: 'pkg-add-success',
        loadChildren: () => import('../public/pkg-add-success/pkg-add-success.module').then( m => m.PkgAddSuccessPageModule)
      },
      {
        path: 'listing',
        loadChildren: () => import('../public/listing/listing.module').then( m => m.ListingPageModule)
      },
      {
        path: 'accountcreated',
        loadChildren: () => import('../public/accountcreated/accountcreated.module').then( m => m.AccountcreatedPageModule)
      },
      {
        path: 'cus-home',
        loadChildren: () => import('../public/cus-home/cus-home.module').then( m => m.CusHomePageModule)
      },
      {
        path: 'email-sent',
        loadChildren: () => import('../public/email-sent/email-sent.module').then( m => m.EmailSentPageModule)
      },
      {
        path: 'forgot-pass',
        loadChildren: () => import('../public/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
      },
      {
        path: 'no-carrier',
        loadChildren: () => import('../public/no-carrier/no-carrier.module').then( m => m.NoCarrierPageModule)
      },
      {
        path: 'choose-carrier',
        loadChildren: () => import('../public/choose-carrier/choose-carrier.module').then( m => m.ChooseCarrierPageModule)
      },
      {
        path: '',
        redirectTo: '../public/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '../public/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
