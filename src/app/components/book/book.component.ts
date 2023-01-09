import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { AuthorNamePipe } from 'src/app/services/author.pipe';

@Component({
  selector: 'my-lib-book',
  templateUrl: 'book.component.html',
  styleUrls: ['book.component.scss'],
  standalone: true,
  imports: [AuthorNamePipe]
})

export class BookComponent implements OnInit {
  @Input() book!: Book;
  sHeight: string;
  sTop: string;
  cHeight: string;
  cTop: string;
  tTop: string;
  constructor(private router: Router) {
    const randomHeight = this.getRandomInt(220, 290);
    this.sHeight = `${randomHeight}px`;
    this.sTop = `${280 - randomHeight}px`;

    this.cHeight = `${randomHeight}px`;
    this.cTop = `${280 - randomHeight}px`;
    this.tTop = `${280 - randomHeight}px`;
  }
  ngOnInit(): void {

  }
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  openBook() {
    this.router.navigate(['/home', 'edit-book', this.book.bid])
  }
}