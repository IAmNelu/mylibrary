import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookDBService } from 'src/app/services/book.db.service';

@Component({
  selector: 'my-lib-add-book',
  templateUrl: 'add-book.component.html',
  styleUrls: ['add-book.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export class AddBookComponent implements OnInit {
  title: string = 'Add a new Book';
  book: Book = {
    bid: '',
    title: '',
    author: '',
    yearRead: 0,
    coverUrl: ''
  };
  bookFG = new FormGroup({
    title: new FormControl<string>(this.book.title, Validators.required),
    author: new FormControl<string>(this.book.author, Validators.required),
    yearRead: new FormControl<number>(0, [Validators.required, Validators.min(1900)]),
    coverUrl: new FormControl<string>(this.book.coverUrl, Validators.required),
  });
  constructor(private route: ActivatedRoute, private router: Router, private bs: BookDBService) { }

  ngOnInit(): void {
    if (this.route.snapshot.data['book'] !== undefined) {
      this.book = this.route.snapshot.data['book'];
      this.bookFG.patchValue(this.book);
      this.title = 'Edit the book';
    }
  }
  async addBook() {
    if (this.bookFG.valid) {
      Object.assign(this.book, this.bookFG.value);
      this.trim();
      this.book.bid = `--b-${this.book.title}${this.book.yearRead}${this.book.author}`;
      await this.bs.addBook(this.book);
      //TODO: ADD message to notify
      this.router.navigate(['home/my-book']);
    }
  }

  trim() {
    this.book.title = this.book.title.trim();
    this.book.author = this.book.author.trim();
    this.book.coverUrl = this.book.coverUrl.trim();
  }

  async editBook() {
    if (this.bookFG.valid) {
      Object.assign(this.book, this.bookFG.value);
      this.trim();
      await this.bs.editBook(this.book);
      this.router.navigate(['home/my-book']);
    }
  }

  cancel() {
    this.router.navigate(['home/my-book']);
  }


  async deleteBook() {
    await this.bs.deleteBook(this.book);
    this.router.navigate(['home/my-book']);
  }

  updateLink() {
    Object.assign(this.book, this.bookFG.value);
  }

  get isEditing() {
    return this.title !== 'Add a new Book';
  }
}