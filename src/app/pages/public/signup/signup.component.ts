import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'my-lib-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent {
  signupFG: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }> = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  });

  constructor(public auth: AuthService) {

  }
  signup() {
    if (this.signupFG.valid) {
      this.auth.signup(this.signupFG.value.email!, this.signupFG.value.password!);
    }
  }

  get emailInvalid(): boolean {
    return this.signupFG.get('email')!.touched && this.signupFG.get('email')!.invalid;
  }

  get passInvalid(): boolean {
    return this.signupFG.get('password')!.touched && this.signupFG.get('password')!.invalid;
  }

  get cPassInvalid(): boolean {
    return this.signupFG.get('confirmPassword')!.touched && !this.passInvalid && this.signupFG.value.password !== this.signupFG.value.confirmPassword;
  }
}
