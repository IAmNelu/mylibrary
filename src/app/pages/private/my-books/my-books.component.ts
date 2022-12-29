import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'selector-name',
  template: `<h1>Inner Router</h1>`
})

export class MyBooksComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}