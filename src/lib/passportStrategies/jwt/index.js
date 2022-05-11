import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from  'passport-jwt';
import 'dotenv/config';
import User from '../../../models/User.js';
import UsersDto from '../../../dtos/users.dto.js';
import ApiError from '../../../exceptions/ApiError.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
};

const strategy = new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findByPk(jwtPayload.userId);

    if (!user) {
      return done(ApiError.UnauthorizedError(), false);
    }
    const userData = new UsersDto(user);
    return done(null, { ...userData });
  } catch (e) {
    return done(e, false);
  }
});

export default (passport) => {
  passport.use(strategy);
};
