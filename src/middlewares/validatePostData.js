const ERRORS = require('../consts/errors');

const validatePostData = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) return next({ error: ERRORS.missingData });

  return next();
};

module.exports = validatePostData;
