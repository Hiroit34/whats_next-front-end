import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AdminTaskComponent } from './admin-task/admin-task.component';

const routes: Routes = [
  { path: '',
    component: AdminComponent
  },
  { path: 'task',
    component: AdminTaskComponent
  },
  { path: 'admin-create',
    component: CreateTaskComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
