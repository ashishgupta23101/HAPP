import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  } , {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'product-activity',
    loadChildren: () => import('./public/product-activity/product-activity.module').then( m => m.ProductActivityPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./public/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./public/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./public/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'link-email-ac',
    loadChildren: () => import('./public/link-email-ac/link-email-ac.module').then( m => m.LinkEmailAcPageModule)
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
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./public/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'have-question',
    loadChildren: () => import('./public/have-question/have-question.module').then( m => m.HaveQuestionPageModule)
  },
  {
    path: 'helpconfirm',
    loadChildren: () => import('./public/helpconfirm/helpconfirm.module').then( m => m.HelpconfirmPageModule)
  },
  {
    path: 'link-email-fail',
    loadChildren: () => import('./public/link-email-fail/link-email-fail.module').then( m => m.LinkEmailFailPageModule)
  },
  {
    path: 'list-detail/:any',
    loadChildren: () => import('./public/list-detail/list-detail.module').then( m => m.ListDetailPageModule)
  },
  {
    path: 'login-success',
    loadChildren: () => import('./public/login-success/login-success.module').then( m => m.LoginSuccessPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./public/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'not-register',
    loadChildren: () => import('./public/not-register/not-register.module').then( m => m.NotRegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./public/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'notifications-confirm',
    loadChildren: () => import('./public/notifications-confirm/notifications-confirm.module').then( m => m.NotificationsConfirmPageModule)
  },
  {
    path: 'pkgshipinfo',
    loadChildren: () => import('./public/pkgshipinfo/pkgshipinfo.module').then( m => m.PkgshipinfoPageModule)
  },
  {
    path: 'pkgshipinfo2',
    loadChildren: () => import('./public/pkgshipinfo2/pkgshipinfo2.module').then( m => m.Pkgshipinfo2PageModule)
  },
  {
    path: 'product-activity',
    loadChildren: () => import('./public/product-activity/product-activity.module').then( m => m.ProductActivityPageModule)
  },
  {
    path: 'retail-ac-user',
    loadChildren: () => import('./public/retail-ac-user/retail-ac-user.module').then( m => m.RetailAcUserPageModule)
  },
  {
    path: 'retail-account',
    loadChildren: () => import('./public/retail-account/retail-account.module').then( m => m.RetailAccountPageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./public/activity/activity.module').then( m => m.ActivityPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
