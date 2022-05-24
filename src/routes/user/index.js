const { Router } = require('express');
const rescue = require('express-rescue');
const validateAccessData = require('../../middlewares/validateAccessData');
const validateUserData = require('../../middlewares/validateUserData');
const { validateToken } = require('../../auth/token');
const User = require('../../controllers/user');

const router = Router();

router
  .post('/', validateAccessData, validateUserData, rescue(User.register))
  .get('/:id', validateToken, rescue(User.findById))
  .get('/', validateToken, rescue(User.findAll));

module.exports = router;
