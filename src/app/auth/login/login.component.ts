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

  singIn() {
    this.authSvc.login(this.loginData)
    .subscribe(d => {
      this.router.navigate(['/home'])
    })
  }

}
