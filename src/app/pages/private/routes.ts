import { Routes } from '@angular/router';
import { BookResolver } from 'src/app/services/resolvers';

export const PRIVATE_ROUTES: Routes = [
  {
    path: 'my-books',
    loadComponent: () =>
      import('./my-books/my-books.component')
        .then(pg => pg.MyBooksComponent),
  },
  {
    path: 'edit-lib',
    loadComponent: () =>
      import('./edit-list/edit-lib.component')
        .then(pg => pg.EditLibComponent),
  },
  {
    path: 'new-book',
    loadComponent: () =>
      import('./add-book/add-book.component')
        .then(pg => pg.AddBookComponent),
  },
  {
    path: 'edit-book/:id',
    loadComponent: () =>
      import('./add-book/add-book.component')
        .then(pg => pg.AddBookComponent),
    resolve: { book: BookResolver } //TODO: implement resolver
  },

  { path: '', redirectTo: 'my-books', pathMatch: 'full' },
  { path: '**', redirectTo: 'my-books', pathMatch: 'full' },

];
