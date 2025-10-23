export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthFormConfig {
  title: string;
  subtitle: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitLabel: string;
  forgotPasswordText: string;
  forgotPasswordLink: string;
}

export interface AuthVisualConfig {
  imageSrc: string;
  imageAlt: string;
}
