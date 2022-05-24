const { Router } = require('express');
const login = require('./login');
const user = require('./user');
const category = require('./category');
const post = require('./post');

const router = Router();

router
  .use('/login', login)
  .use('/user', user)
  .use('/categories', category)
  .use('/post', post);

module.exports = router;
