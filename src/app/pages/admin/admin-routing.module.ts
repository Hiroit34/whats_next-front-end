import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AdminTaskComponent } from './admin-task/admin-task.component';
import { AdminGuard } from '../../core/guard/admin.guard';
import { CategoryAdminComponent } from './category-admin/category-admin.component';

const routes: Routes = [
  { path: '',
    component: AdminComponent
  },
  { path: 'task',
    component: AdminTaskComponent,
  },
  { path: 'admin-create',
    component: CreateTaskComponent,
  },
  {
    path: 'project',
    component: CategoryAdminComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
