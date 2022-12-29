import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-lib-edit-lib',
  template: `<h2>My Edit</h2>`,
  standalone: true
})

export class EditLibComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}