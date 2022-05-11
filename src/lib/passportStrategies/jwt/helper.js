import passport from 'passport';
import ApiError from '../../../exceptions/ApiError.js';

export const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, _info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    req.user = user;
    return next();
  })(req, res, next);
};
