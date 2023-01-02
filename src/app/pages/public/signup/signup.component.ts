import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'my-lib-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: [],
})
export class SignupComponent {

  email: FormControl<string> = new FormControl();
  password: FormControl<string> = new FormControl();

  constructor(public auth: AuthService) {

  }
  signup() {
    this.auth.signup(this.email.value, this.password.value);
  }
}
