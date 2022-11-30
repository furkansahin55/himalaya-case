/**
 * Custom Error class for API errors
 * @extends Error
 * @class ApiError
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {string} stack - Error stack
 */
class ApiError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
