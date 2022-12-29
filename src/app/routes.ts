import { Routes } from '@angular/router';
import { LoginAuthGuard, UserAuthGuard } from './services/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/public/login/login.component')
        .then(logIn => logIn.LoginComponent),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/public/signup/signup.component')
        .then(sup => sup.SignupComponent),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/private/navbar/navbar.component')
        .then(sup => sup.NavbarComponent),
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./pages/private/routes')
      .then(pr => pr.PRIVATE_ROUTES)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

export default routes;