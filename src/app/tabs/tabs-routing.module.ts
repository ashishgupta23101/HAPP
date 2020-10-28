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
