import { Component, importProvidersFrom, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-lib-navbar',
  templateUrl: 'navbar.component.html',
  standalone: true,
  imports: [RouterModule],
})

export class NavbarComponent implements OnInit, OnDestroy {
  url: string;
  subscription: Subscription;
  constructor(public route: ActivatedRoute, private router: Router) {
    this.url = this.route.snapshot.url[0].path;
    this.subscription = this.route.url.subscribe(url => {
      this.url = url[0].path;
      console.log(this.url);

    });


  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    console.log(this.url);
    console.log(this.route.snapshot.url);


  }
}