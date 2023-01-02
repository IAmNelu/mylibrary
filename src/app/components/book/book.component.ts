import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'my-lib-book',
  templateUrl: 'book.component.html',
  standalone: true
})

export class BookComponent {
  @Input() book!: Book;
  constructor() { }
}