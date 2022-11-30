const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");

/**
 * If error is not an instanceOf APIError, convert it
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

/**
 * Catch 404 and forward to error handler
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {Error} err
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    req.log.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
