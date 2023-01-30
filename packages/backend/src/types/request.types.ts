import { Request } from 'express';

export interface TypedRequestBody extends Request {
  title?: string;
  description?: string;
  todo?: string;
  login?: string;
  password?: string;
  confirmPassword?: string;
}
