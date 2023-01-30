import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import response from './response.middleware';

export const isAutorised = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;
  try {
    jwt.verify(token, 'jwt-key');
    next();
  } catch (e) {
    response(401, { message: 'unathorized user' }, res);
  }
};
                