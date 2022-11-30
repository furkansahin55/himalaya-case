const Joi = require("joi");

const getBalances = {
  query: Joi.object().keys({
    addresses: Joi.array().items(Joi.string().length(42)).max(100).required(),
  }),
};

module.exports = {
  getBalances,
};
