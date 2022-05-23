const { Category } = require('../database/models');
const ERRORS = require('../consts/errors');

const findAll = async () => Category.findAll();

const findById = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) return { error: ERRORS.categoryNotFound };

  return category;
};

const register = async (name) => Category.create({ name });

module.exports = { findAll, findById, register };
