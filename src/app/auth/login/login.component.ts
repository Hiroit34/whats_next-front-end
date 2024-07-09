import { Component } from '@angular/core';
import { iLogin } from '../../models/login';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  value: string | undefined;

  loginData: iLogin = {
    username:"",
    password:""
  }

  submitted: boolean = false;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private taskService: TaskService
  ){}

  signIn() {
    this.authSvc.login(this.loginData).subscribe({
      next: () => {
        const role = this.authSvc.getRole();
        if (role === 'ADMIN') {
          this.taskService.loadAllTasks();
          this.router.navigate(['/admin/task']);
        } else if (role === 'USER') {
          this.taskService.loadAllTasks();
          this.router.navigate(['/user/task']);
        } else {
          // Navigate to a default route or show an error if role is unrecognized
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        // Handle login error
        console.error('Login error:', error);
      }
    });
  }

  logout() {
    this.authSvc.logout();
    this.taskService.resetTasks(); // Resetta le task al logout
  }

}
