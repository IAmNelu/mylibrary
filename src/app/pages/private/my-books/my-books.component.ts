import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookComponent } from 'src/app/components/book/book.component';
import { Book } from 'src/app/models/book';
import { BookDBService } from 'src/app/services/book.db.service';

@Component({
  imports: [CommonModule, BookComponent],
  standalone: true,
  selector: 'my-lib-my-books',
  templateUrl: 'my-books.component.html'
})

export class MyBooksComponent implements OnInit {
  public books: Book[] = [];
  constructor(private bs: BookDBService) {
    this.bs.getBooks().subscribe(books => {
      this.books = books;

    })
  }

  ngOnInit() {

  }
}