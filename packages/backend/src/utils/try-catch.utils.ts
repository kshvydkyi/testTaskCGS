import { Request, Response, NextFunction } from 'express';
import response from '../middleware/response.middleware';

const tryCatch =
  (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller(req, res);
      response(200, { values: result || 'Ok' }, res);
    } catch (error) {
      if (error.code === 11000) {
        return response(400, { message: 'duplicate key error collection' }, res);
      }
      response(400, { error }, res);
      return next(error);
    }
  };
export default tryCatch;
