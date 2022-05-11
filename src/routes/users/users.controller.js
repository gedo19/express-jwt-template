import usersService from '../../services/users.service.js';

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await usersService.getAll();
      return res.json({ data: users, errors: [] });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const user = await usersService.getOne(req.user.userId);
      return res.json({data: user, errors: []});
    } catch (e) {
      next(e);
    }
  }
}

export default new UsersController();
