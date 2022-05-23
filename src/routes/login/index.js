const { Router } = require('express');
const validateAccessData = require('../../middlewares/validateAccessData');
// const validateUserData = require('../middlewares/validateUserData');
// const { validateToken } = require('../auth/token');
const User = require('../../controllers/user');

const router = Router();

router
  .post('/login', validateAccessData, User.login);

module.exports = router;
