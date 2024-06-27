import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '',
    component: UserComponent
  },
  { path: 'create',
    component: CreateTaskComponent
  },
  { path: 'task',
    component: TaskComponent
  },
  { path: 'profile-user',
    component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
