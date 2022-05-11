import { validationResult } from 'express-validator';

import ApiError from '../../exceptions/ApiError.js';
import authService from '../../services/auth.service.js';

class AuthController {
  async registerUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { email, password } = req.body.data;
      const data = await authService.register(email, password);

      res.cookie('refreshToken', data.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json({ data, errors: [] });
    } catch (e) {
      next(e);
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body.data;
      const data = await authService.login(email, password);

      res.cookie('refreshToken', data.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json({ data, errors: [] });
    } catch (e) {
      next(e);
    }
  }

  async logoutUser(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);

      res.clearCookie('refreshToken');
      return res.json({ data: token, errors: [] })
    } catch (e) {
      next(e);
    }
  }

  async refreshTokens(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);

      res.cookie('refreshToken', data.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json({ data: data, errors: [] });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
