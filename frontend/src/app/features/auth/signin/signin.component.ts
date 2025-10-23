import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { AuthVisualComponent } from '../components/auth-visual/auth-visual.component';
import { AuthFormComponent } from '../components/auth-form/auth-form.component';
import { AuthCredentials } from '../models/auth.model';
import { SIGNIN_FORM_CONFIG, SIGNIN_VISUAL_CONFIG } from './signin.data';

@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [AuthLayoutComponent, AuthVisualComponent, AuthFormComponent],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  formConfig = SIGNIN_FORM_CONFIG;
  visualConfig = SIGNIN_VISUAL_CONFIG;

  constructor(private router: Router) {}

  onSignin(credentials: AuthCredentials): void {
    console.log('Sign in attempt:', credentials);
    // auth logic
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}
