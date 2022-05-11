import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Token from '../models/Token.js';

class TokensService {
  generateTokens(payload) {
    return {
      accessToken: jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' }),
      refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' }),
    };
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId } });

    if (tokenData) {
      return Token.update({ refreshToken }, { where: { userId } });
    }

    return Token.create({ userId, refreshToken });
  }

  deleteToken(refreshToken) {
    return Token.destroy({ where: { refreshToken } });
  }

  findToken(refreshToken) {
    return Token.findOne({ where: { refreshToken } });
  }
}

export default new TokensService();
