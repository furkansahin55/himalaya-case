const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { pick } = require("../utils/UtilFunctions");

/**
 * Validate request body against a Joi schema
 * @param {string} schema
 */
const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["query"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
