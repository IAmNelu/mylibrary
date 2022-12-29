import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';


@Component({
  selector: 'my-lib-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: [],
})
export class SignupComponent {
  constructor(public auth: AuthService) {

  }
}
