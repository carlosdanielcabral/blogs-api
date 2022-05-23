const Categories = require('../services/categories');
const HTTP_STATUS_CODE = require('../consts/httpStatusCode');

const findAll = async (req, res) => {
  const categories = await Categories.findAll();

  res.status(HTTP_STATUS_CODE.ok).json(categories);
};

const register = async (req, res, next) => {
  const { name } = req.body;

  const category = await Categories.register(name);

  if (category.error) return next({ error: category.error });

  res.status(HTTP_STATUS_CODE.created).json(category);
};

module.exports = { findAll, register };
