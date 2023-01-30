import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import response from './response.middleware';

const isExist = (model: Model) => async (req: Request, res: Response, next: NextFunction) => {
  const result = await model.findById(req.params.todo);
  if (!result) {
    return response(404, { message: 'Can`t find data' }, res);
  }
  next();
};

export const isLoginExist = (model: Model) => async (req: Request, res: Response, next: NextFunction) => {
    const result = await model.find({ login: req.body.login });
    if (result[0]) {
      return response(409, { message: 'User with this login already exists' }, res);
    }
    next();
  };

export default isExist;
