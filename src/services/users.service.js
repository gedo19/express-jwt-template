import User from '../models/User.js';

class UsersService {
  getAll() {
    return User.findAll();
  }

  getOne(userId) {
    return User.findByPk(userId);
  }
}

export default new UsersService();
