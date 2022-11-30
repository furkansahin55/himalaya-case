const balancesService = require("../services/balances.service");
const { catchAsync } = require("../utils/UtilFunctions");

const getBalances = catchAsync(async (req, res) => {
  const result = await balancesService.getBalances(req.query.addresses);
  res.send(result);
});

module.exports = {
  getBalances,
};
