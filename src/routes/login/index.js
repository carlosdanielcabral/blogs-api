const { Router } = require('express');
const rescue = require('express-rescue');
const validateAccessData = require('../../middlewares/validateAccessData');

const User = require('../../controllers/user');

const router = Router();

router
  .post('/', validateAccessData, rescue(User.login));

module.exports = router;
