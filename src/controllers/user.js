const User = require('../services/user');
const HTTP_STATUS_CODE = require('../consts/httpStatusCode');
const token = require('../auth/token');

const findAll = async (req, res) => {
  const user = User.findAll();

  res.status(HTTP_STATUS_CODE.ok).json(user);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const user = User.findById(id);

  if (user.error) return next({ error: user.error });

  res.status(HTTP_STATUS_CODE.ok).json(user);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = User.login(email, password);

  if (user.error) return next({ error: user.error });

  const { password: userPassword, ...data } = user;

  const newToken = token.generateToken(data);

  res.status(HTTP_STATUS_CODE.ok).json({ token: newToken });
};

const register = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const user = User.register(displayName, email, password, image);

  if (user.error) return next({ error: user.error });

  const { password: userPassword, ...data } = user;

  const newToken = token.generateToken(data);

  res.status(HTTP_STATUS_CODE.created).json({ token: newToken });
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  const user = User.remove(id);

  if (user.error) return next({ error: user.error });

  res.status(HTTP_STATUS_CODE.noContent).end();
};

module.exports = { findAll, findById, login, register, remove };
