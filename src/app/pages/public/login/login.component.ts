import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'my-lib-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-3 col-md-4">
      <div class="row mx-5"> <h3>Log In</h3> </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" [class.is-invalid]="!email.valid && email.touched"  placeholder="name@example.com"  [formControl]="email">
        <label for="floatingInput">Email address</label>
        <div class="invalid-feedback">
          Please provide a valid email.
        </div>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" [class.is-invalid]="!password.valid && password.touched" placeholder="Password" [formControl]="password">
        <label for="floatingPassword">Password</label>
        <div class="invalid-feedback">
          Please provide a password.
        </div>
      </div>
    <div class="row mt-3 mx-2">
      <button type="button" class="btn btn-primary" (click)="logIn()">Log In</button>
    </div>
    <div class="row mt-3 mx-2">
    <button type="button" class="btn btn-primary" (click)="authS.googleAuth()">Log with google</button>
  </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [Validators.required]);

  constructor(public authS: AuthService) { }

  logIn() {
    if (this.email.valid && this.password.valid) {
      this.authS.login(this.email.value!, this.password.value!);
    }
  }

}
