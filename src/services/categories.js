const { Categories } = require('../database/models');
const ERRORS = require('../consts/errors');

const findAll = async () => Categories.findAll();

const findById = async (id) => {
  const category = await Categories.findByPk(id);

  if (!category) return { error: ERRORS.categoryNotFound };

  return category;
};

const register = async (name) => Categories.create({ name });

module.exports = { findAll, findById, register };
