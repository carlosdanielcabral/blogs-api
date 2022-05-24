const { Router } = require('express');
const login = require('./login');
const user = require('./user');
const category = require('./category');

const router = Router();

router
  .use('/login', login)
  .use('/user', user)
  .use('/categories', category);

module.exports = router;
