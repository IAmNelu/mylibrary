import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-lib-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-3">
      <div class="row mx-5"> <h3>Log In</h3> </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
    <div class="row mt-3 mx-2">
      <button type="button" class="btn btn-primary">Log In</button>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

}
