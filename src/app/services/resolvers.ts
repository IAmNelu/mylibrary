import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookDBService } from './book.db.service';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Observable<Book | {}>> {
  constructor(private bs: BookDBService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Book | {}> {
    return from(this.bs.getBook(route.paramMap.get('id')!));
  }
}