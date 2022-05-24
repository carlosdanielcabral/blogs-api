const { Router } = require('express');
const rescue = require('express-rescue');
const validateName = require('../../middlewares/validateName');
const { validateToken } = require('../../auth/token');
const Category = require('../../controllers/category');

const router = Router();

router
  .post('/', validateToken, validateName, rescue(Category.register));

module.exports = router;
