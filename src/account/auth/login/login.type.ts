import { ErrorResponse } from '@remix-run/router';
import { number } from 'yup';

export interface User {
  email: string;
  password: string;
}

export interface ErrorRespond {
  message: string;
  error_field: keyof User;
}

export interface StateLocation {
  message: string;
  error_field: keyof User;
}
