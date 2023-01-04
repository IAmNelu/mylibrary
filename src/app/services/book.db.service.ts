import { inject, Injectable } from '@angular/core';

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
  collection
} from '@angular/fire/firestore';
import { Book } from '../models/book';



@Injectable({ providedIn: 'root' })
export class BookDBService {
  private playerSource = new BehaviorSubject<any | null>(null);
  players$ = this.playerSource.asObservable();
  constructor(public firestore: Firestore) {
  }
  getBooks() {
    const booksRef = collection(this.firestore, 'books');
    let q = query(booksRef);
    return collectionData(q) as unknown as Observable<Book[]>;
  }

  async getBook(id: string): Promise<Book | {}> {
    const docRef = doc(this.firestore, "books", id);
    const r = await getDoc(docRef);
    if (r.data === undefined) {
      return {};
    }
    return r.data() as Book;
  }
}

