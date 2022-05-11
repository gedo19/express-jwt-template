export default class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
  }

  static UnauthorizedError(errors) {
    return new ApiError(
      401,
      'Unauthorized',
      [{ message: 'Unauthorized' }],
    );
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}
