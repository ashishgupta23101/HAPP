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
        path: 'product-activity',
        loadChildren: () => import('../public/product-activity/product-activity.module').then( m => m.ProductActivityPageModule)
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
        path: 'listing',
        loadChildren: () => import('../public/listing/listing.module').then( m => m.ListingPageModule)
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
