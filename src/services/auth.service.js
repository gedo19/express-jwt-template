import ApiError from '../exceptions/ApiError.js';
import sequelize from '../db.js';
import User from '../models/User.js';
import tokensService from './tokens.service.js';
import UsersDto from '../dtos/users.dto.js';

class AuthService {
  async register(email, password) {
    try {
      return sequelize.transaction(async () => {
        const user = await User.create({ email, password });
        const userDto = new UsersDto(user);
        const tokens = tokensService.generateTokens({ ...userDto });
        await tokensService.saveToken(userDto.userId, tokens.refreshToken);

        return { user: userDto, ...tokens };
      });
    } catch ({ message, errors }) {
      throw ApiError.BadRequest(message, errors);
    }
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const isMatch = await user.authenticate(password);

    if (!isMatch) {
      throw ApiError.BadRequest('Wrong password');
    }

    const userDto = new UsersDto(user);
    const tokens = tokensService.generateTokens({ ...userDto });
    await tokensService.saveToken(userDto.userId, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  logout(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    return tokensService.deleteToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const token = await tokensService.findToken(refreshToken);
    const userData = await tokensService.validateRefreshToken(refreshToken);
    if (!token || !userData) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findByPk(userData.userId);
    const userDto = new UsersDto(user);
    const tokens = tokensService.generateTokens({ ...userDto });
    await tokensService.saveToken(userDto.userId, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

export default new AuthService();
