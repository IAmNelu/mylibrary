import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-lib-edit-lib',
  template: `<h2>My Edit</h2>
    <button (click)="goTo()"> Test</button>
  `,
  standalone: true
})

export class EditLibComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }


  goTo() {
    this.router.navigate(['home', 'edit-book', '2vYGVzTnAJztjyCCZrfv']);
  }
}