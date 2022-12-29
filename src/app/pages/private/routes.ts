import { Routes } from '@angular/router';

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

  { path: '', redirectTo: 'my-books', pathMatch: 'full' },
  { path: '**', redirectTo: 'my-books', pathMatch: 'full' },

];
