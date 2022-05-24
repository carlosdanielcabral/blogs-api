const ERRORS = require('../consts/errors');

const validatePostDataUpdate = (req, _res, next) => {
  const { title, content } = req.body;

  if (!title || !content) return next({ error: ERRORS.missingData });

  return next();
};

module.exports = validatePostDataUpdate;
