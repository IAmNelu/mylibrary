import { Component, importProvidersFrom, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'my-lib-navbar',
  templateUrl: 'navbar.component.html',
  standalone: true,
  imports: [RouterModule],
})

export class NavbarComponent {


  constructor(public route: ActivatedRoute, public authS: AuthService) {
  }


}