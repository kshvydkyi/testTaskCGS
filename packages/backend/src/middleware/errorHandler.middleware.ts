import { Request, Response, NextFunction } from 'express';
import response from './response.middleware';

const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) =>
  response(400, { message: error.message }, res);

export default ErrorHandler;
