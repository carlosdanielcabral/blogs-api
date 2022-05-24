const { Router } = require('express');
const rescue = require('express-rescue');
const validateAccessData = require('../../middlewares/validateAccessData');
const validateUserData = require('../../middlewares/validateUserData');
const User = require('../../controllers/user');

const router = Router();

router
  .post('/', validateAccessData, validateUserData, rescue(User.register));

module.exports = router;
