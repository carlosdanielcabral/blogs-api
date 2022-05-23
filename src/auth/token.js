require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const ERRORS = require('../consts/errors');

const secret = process.env.SECRET_KEY;

const generateToken = (data) => {
  const jwtConfig = {
    expiresIn: '12h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data }, secret, jwtConfig);

  return token;
};

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next({ error: ERRORS.tokenNotFound });

  try {
    const { data: { id } } = jwt.verify(token, secret);

    const user = await User.findById({ where: { id } });

    if (!user) return next({ error: ERRORS.invalidToken });

    req.user = user;

    next();
  } catch (err) {
    return next({ error: ERRORS.internalServerError });
  }
};

module.exports = { generateToken, validateToken };
