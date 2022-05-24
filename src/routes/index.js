const { Router } = require('express');
const login = require('./login');
const user = require('./user');

const router = Router();

router
  .use('/login', login)
  .use('/user', user);

module.exports = router;
