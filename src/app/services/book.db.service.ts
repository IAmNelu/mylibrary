import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
  Firestore,
  collection,
  setDoc
} from '@angular/fire/firestore';
import { Book } from '../models/book';
import { AuthService } from './auth.service';



@Injectable({ providedIn: 'root' })
export class BookDBService {
  private playerSource = new BehaviorSubject<any | null>(null);
  players$ = this.playerSource.asObservable();
  constructor(public firestore: Firestore, private authS: AuthService) {
  }

  async getBooks() {
    const uid = this.authS.user.uid;
    const booksRef = doc(this.firestore, `books/${uid}`);
    return (await getDoc(booksRef)).data()!['books'] as unknown as Book[];
  }

  async addBook(b: Book) {
    const uid = this.authS.user.uid;
    const booksRef = doc(this.firestore, `books/${uid}`);
    const books = (await getDoc(booksRef)).data();

    return setDoc(booksRef, { books: [...books!['books'], b] }, { merge: true });
  }

  async getBook(id: string): Promise<Book | {}> {
    const b = (await this.getBooks()).find(b => b.bid === id);
    if (b === undefined) {
      return {};
    }
    return b;
  }

  async editBook(b: Book) {
    const uid = this.authS.user.uid;
    const booksRef = doc(this.firestore, `books/${uid}`);
    const books = (await getDoc(booksRef)).data()!['books'] as Book[];
    const newBooks = books.filter(book => book.bid !== b.bid);
    newBooks.push(b);
    return setDoc(booksRef, { books: newBooks }, { merge: true });
  }

  async deleteBook(b: Book) {
    const uid = this.authS.user.uid;
    const booksRef = doc(this.firestore, `books/${uid}`);
    const books = (await getDoc(booksRef)).data()!['books'] as Book[];
    const newBooks = books.filter(book => book.bid !== b.bid);
    return setDoc(booksRef, { books: newBooks }, { merge: true });
  }
}

