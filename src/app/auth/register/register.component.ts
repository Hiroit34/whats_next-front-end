import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { iUser } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {}

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;

    return password === confirmPassword && email === confirmEmail ? null : { notMatching: true };
  }

  signUp() {
    if (this.registerForm.invalid) {
      return;
    }

    const { confirmEmail, confirmPassword, ...registerData } = this.registerForm.value;

    this.authSvc.register(registerData).subscribe(data => {
      this.router.navigate(['/auth/login']);
    });
  }
}
