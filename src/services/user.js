const { User } = require('../database/models');
const ERRORS = require('../consts/errors');

const remove = async (id) => User.destroy(id);

const findAll = async () => User.findAll({
  attributes: ['id', 'displayName', 'email', 'image'],
});

const findById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  if (!user) return { error: ERRORS.userNotFound };

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) return { error: ERRORS.invalidFields };

  return user;
};

const register = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });

  if (user) return { error: ERRORS.userAlreadyRegistered };

  return User.create({ displayName, email, password, image });
};

module.exports = { findAll, findById, login, register, remove };
