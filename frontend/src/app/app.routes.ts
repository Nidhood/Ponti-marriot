import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SigninComponent } from './features/signin/signin.component';

export const routes: Routes = [
  // Public routes:
  { path: '', component: HomeComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: '**', redirectTo: '' },
];
