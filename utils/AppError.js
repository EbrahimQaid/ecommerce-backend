class AppError extends Error {
  constructor(message, statusCode = 500, statusText = "fail") {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.statusText = statusText;
    Error.captureStackTrace(this, this.constructor);
  }

  static create(message, statusCode, statusText) {
    return new AppError(message, statusCode, statusText);
  }
}

module.exports = AppError;
