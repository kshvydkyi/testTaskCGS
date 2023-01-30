import User from '../models/User';

export default class UserService {
  async registerNewUser(login: string, password: string) {
    await User.create({ login, password });
  }

  async getUser(login: string) {
    const response = await User.find({ login });
    return response;
  }

  async updatePassword(password: string, id: string) {
    await User.findByIdAndUpdate(id, { password });
  }
}
