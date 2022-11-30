/**
 * split query by given chracter reinsert it in the query
 * @param {string} splitBy
 * @param {string} queryName
 */
const splitQuery = (splitBy, queryName) => (req, res, next) => {
  const query = req.query[queryName];
  if (query) {
    const queries = query.split(splitBy);
    req.query[queryName] = queries;
  }
  next();
};

module.exports = splitQuery;
