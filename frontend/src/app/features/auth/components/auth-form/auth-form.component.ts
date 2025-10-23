import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { AuthCredentials, AuthFormConfig } from '../../models/auth.model';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-auth-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
  @Input() config!: AuthFormConfig;
  @Input() logoSrc = '/images/ponti-marriot-white.png';
  @Input() logoAlt = 'PontiMarriot Logo';
  @Output() submitForm = new EventEmitter<AuthCredentials>();

  signinForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      this.submitForm.emit(this.signinForm.value);
    }
  }

  get isFormInvalid(): boolean {
    return this.signinForm.invalid;
  }
}
