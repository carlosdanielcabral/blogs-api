const Joi = require('joi');

const validateName = (req, _res, next) => {
  const { name } = req.body;

  const { error } = Joi.object({ name: Joi.string().required() })
    .validate({ name });

  if (error) return next(error);

  return next();
};

module.exports = validateName;
