import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'my-lib-shelf',
  templateUrl: 'shelf.component.html',
  styleUrls: ['shelf.component.scss'],
  standalone: true,
  imports: [BookComponent, CommonModule]
})

export class ShelfComponent implements OnInit {
  @Input() books!: Book[];
  @Input() tag!: string;

  constructor() { }

  ngOnInit() { }
}