import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './auth-forgot-password.component.html',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      console.log('Password reset request:', this.forgotPasswordForm.value);
      setTimeout(() => {
        alert('Reset link sent to your email!');
        this.router.navigate(['/auth/signin']);
      }, 1000);
    }
  }

  get isFormInvalid(): boolean {
    return this.forgotPasswordForm.invalid;
  }
}
