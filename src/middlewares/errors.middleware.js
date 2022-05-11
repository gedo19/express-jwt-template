import ApiError from '../exceptions/ApiError.js';

export default (e, req, res, _next) => {
  if (e instanceof ApiError) {
    return res.status(e.statusCode).json({ message: e.message, errors: e.errors });
  }
  return res.status(500).json({ message: e.message || 'Unexpected error', errors: e.errors || [] });
};
