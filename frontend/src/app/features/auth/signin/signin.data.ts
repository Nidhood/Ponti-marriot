import { AuthFormConfig, AuthVisualConfig } from '../models/auth.model';

export const SIGNIN_FORM_CONFIG: AuthFormConfig = {
  title: 'Welcome to PontiMarriot 👋',
  subtitle: 'Kindly fill in your details below to create an account',
  usernameLabel: 'Username',
  usernamePlaceholder: 'Enter your full username',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your password',
  submitLabel: 'Sign in',
  forgotPasswordText: 'forgot password?',
  forgotPasswordLink: '/auth/forgot-password',
};

export const SIGNIN_VISUAL_CONFIG: AuthVisualConfig = {
  imageSrc: '/images/luxury-hotel-signin.jpeg',
  imageAlt: '3D Objects Illustration',
};
