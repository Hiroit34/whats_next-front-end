import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guard/admin.guard';
import { UserGuard } from './core/guard/user.guard';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => { return m.HomeModule; }),

  },
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => { return m.AuthModule; }),

  },
  { path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => { return m.AdminModule; }),
    canActivate: [AdminGuard]
  },
  { path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => { return m.UserModule; }),
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
