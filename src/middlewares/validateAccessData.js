const ERRORS = require('../consts/errors');

const validateAccessData = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next({ error: ERRORS.missingData });

  return next();
};

module.exports = validateAccessData;
