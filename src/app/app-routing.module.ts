import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => { console.log('AuthModule loaded'); return m.AuthModule; }) },
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => { console.log('HomeModule loaded'); return m.HomeModule; }) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => { console.log('AdminModule loaded'); return m.AdminModule; }) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => { console.log('UserModule loaded'); return m.UserModule; }) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
