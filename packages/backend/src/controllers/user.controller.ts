import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import hashPassword from '../utils/hash-password.utils';
import UserService from '../services/user.service';
import { TypedRequestBody } from '../types/request.types';


export class UserController {
  constructor(private userService: UserService) { }

  async registerUser(req: TypedRequestBody, res: Response) {
    const password = await hashPassword(req.body.password);
    await this.userService.registerNewUser(req.body.login, password);
  }

  async loginUser(req: TypedRequestBody, res: Response) {
    const userInfo = await this.userService.getUser(req.body.login);
    if (userInfo[0]) {
      const password = await hashPassword(req.body.password);
      if (password === userInfo[0].password) {
        const token = jwt.sign(
          {
            userId: userInfo[0]._id,
            login: userInfo[0].login
          },
          'jwt-key',
          { expiresIn: '30d' }
        );
        return token;
      }
    }
    return 'passwords do not match or this user do not exist';
  }

  async updatePassword(req: TypedRequestBody, res: Response) {
    const userData = jwt.verify(req.params.token, 'jwt-key');
    // console.log(userData);
    const password = await hashPassword(req.body.password);
    await this.userService.updatePassword(password, userData.userId);
  }
}

const userController = new UserController(new UserService());
export default userController;
