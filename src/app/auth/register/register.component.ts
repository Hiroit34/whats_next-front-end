import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { iUser } from './../../models/user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData: Partial<iUser> = {};

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  signUp() {
    this.authSvc.register(this.registerData)
    .subscribe(data => {
      this.router.navigate(['/auth/login'])
    })
  }
}
