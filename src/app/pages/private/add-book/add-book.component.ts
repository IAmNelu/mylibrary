import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'my-lib-add-book',
  template: `<h2>Let's add a book</h2>`,
  standalone: true
})

export class AddBookComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    yearRead: 0,
    coverUrl: ''
  };
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.data['book'] !== undefined) {
      this.book = this.route.snapshot.data['book'];
    }
  }
}