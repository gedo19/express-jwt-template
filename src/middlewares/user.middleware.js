import ApiError from '../exceptions/ApiError.js';

export default (req, res, next) => {
  if (req.user.userId === Number(req.params.userId)) {
    return next();
  }
  return next(ApiError.UnauthorizedError());
};
