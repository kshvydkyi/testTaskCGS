import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import response from './response.middleware';

const isAccess = (model: Model) => async (req: Request, res: Response, next: NextFunction) => {
  const result = await model.findById(req.params.todo);
  const userData = jwt.verify(req.params.token, 'jwt-key');
  if (String(result.userId) !== userData.userId) {
    return response(403, { message: 'access denied' }, res);
  }
  next();
};

export default isAccess;
