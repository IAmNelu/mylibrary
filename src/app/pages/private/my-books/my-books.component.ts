import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShelfComponent } from 'src/app/components/shelf/shelf.component';
import { Book } from 'src/app/models/book';
import { BookDBService } from 'src/app/services/book.db.service';

@Component({
  imports: [CommonModule, ShelfComponent, RouterModule],
  standalone: true,
  selector: 'my-lib-my-books',
  templateUrl: 'my-books.component.html',
  styleUrls: ['my-books.component.scss']
})

export class MyBooksComponent implements OnInit {
  public bookShelves: Record<number, Book[]> = {};
  public shelves: number[] = [];
  constructor(private bs: BookDBService) {
    this.bs.getBooks().then((books) => {
      const _books = books;
      _books.sort((b1, b2) => b1.bid.localeCompare(b2.bid));
      this.bookShelves = this.groupByYear(_books);
    });

  }

  ngOnInit() {
  }

  groupByYear(books: Book[]) {
    type BooksPerYear = Record<number, Book[]>;
    return books.reduce((group: BooksPerYear, current) => {
      if (current.yearRead in group) {
        group[current.yearRead].push(current);
      } else {
        this.shelves.push(current.yearRead)
        group[current.yearRead] = [current];
      }
      return group;

    }, {})
  }
}