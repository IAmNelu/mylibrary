import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-lib-edit-lib',
  template: `<h2>Edit Page -- Work in Progress</h2>
  `,
  standalone: true
})

export class EditLibComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }
}