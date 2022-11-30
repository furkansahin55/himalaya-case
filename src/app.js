const express = require("express");
const httpStatus = require("http-status");
const pino = require("express-pino-logger");
const validate = require("./middlewares/validate");
const balancesValidation = require("./validations/balances.validation");
const balancesController = require("./controllers/balances.controller");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const splitQuery = require("./middlewares/querySplitter");

const app = express();

// logging requests and responses
const expressPino = pino({
  level: "info",
});
app.use(expressPino);

// GET /balances endpoint
app.get(
  "/balances",
  splitQuery(",", "addresses"),
  validate(balancesValidation.getBalances),
  balancesController.getBalances
);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = { app, logger: expressPino.logger };
