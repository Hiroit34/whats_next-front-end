import { Component } from '@angular/core';
import { iLogin } from '../../models/login';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private router: Router
  ){}

  signIn() {
    this.authSvc.login(this.loginData).subscribe({
      next: () => {
        const role = this.authSvc.getRole();
        if (role === 'ADMIN') {
          this.router.navigate(['/admin/task']);
        } else if (role === 'USER') {
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

}
