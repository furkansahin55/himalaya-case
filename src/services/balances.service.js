/* eslint-disable no-param-reassign */
const axios = require("axios");
const BN = require("bn.js");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { sleep } = require("../utils/UtilFunctions");

/**
 * Get balances from api
 * @param {string[]} addresses
 * @returns {Promise<{address: string, balance: string}[]>}
 */
const getBalancesFromApi = async (addresses) => {
  const apiResponse = await axios.get("https://api-goerli.etherscan.io/api", {
    headers: {
      "Accept-Encoding": "application/json",
    },
    params: {
      module: "account",
      action: "balancemulti",
      address: addresses.join(","),
    },
  });
  if (apiResponse.data.status === "1") {
    return apiResponse.data.result;
  }
  if (apiResponse.data.status === "0" && apiResponse.data.message === "NOTOK") {
    // retry if api limit reached
    await sleep(1000);
    return getBalancesFromApi(addresses);
  }
  throw new ApiError(
    httpStatus.INTERNAL_SERVER_ERROR,
    apiResponse.data.message
  );
};

/**
 * Get balances service
 * @param {string[]} addresses
 * @returns {Promise<{address: string, balance: string}[]>}
 */
const getBalances = async (addresses) => {
  let resultBalances = [];

  // divide into 20 address batches to avoid max limit
  const batches = [];
  const size = 20;
  while (addresses.length > 0) {
    batches.push(addresses.splice(0, size));
  }

  // get balances for each batch and add to promise array
  const promises = [];
  batches.forEach((batch) => {
    promises.push(getBalancesFromApi(batch));
  });

  // wait for all promises to resolve
  const balances = await Promise.all(promises);

  // flatten balances array
  balances.forEach((batch) => {
    resultBalances = resultBalances.concat(batch);
  });

  // calculate total balance
  const totalBalance = new BN(0);
  resultBalances.forEach((balance) => {
    // rename account field to address
    balance.address = balance.account;
    delete balance.account;
    totalBalance.iadd(new BN(balance.balance));
  });

  return { addresses: resultBalances, totalBalance: totalBalance.toString() };
};

module.exports = {
  getBalances,
};
