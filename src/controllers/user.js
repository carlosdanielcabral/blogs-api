const User = require('../services/user');
const HTTP_STATUS_CODE = require('../consts/httpStatusCode');
const { generateToken } = require('../auth/token');

const findAll = async (req, res) => {
  const user = await User.findAll();

  res.status(HTTP_STATUS_CODE.ok).json(user);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user.error) return next({ error: user.error });

  res.status(HTTP_STATUS_CODE.ok).json(user);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  if (user.error) return next({ error: user.error });

  const { password: userPassword, ...data } = user;

  const token = generateToken(data);

  res.status(HTTP_STATUS_CODE.ok).json({ token });
};

const register = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.register(displayName, email, password, image);

  if (user.error) return next({ error: user.error });

  const { password: userPassword, ...data } = user;

  const token = generateToken(data);

  res.status(HTTP_STATUS_CODE.created).json({ token });
};

const remove = async (req, res, next) => {
  const { dataValues: { id } } = req.user;

  const user = await User.remove(id);

  if (user.error) return next({ error: user.error });

  res.status(HTTP_STATUS_CODE.noContent).end();
};

module.exports = { findAll, findById, login, register, remove };
