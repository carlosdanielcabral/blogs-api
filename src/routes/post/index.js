const { Router } = require('express');
const rescue = require('express-rescue');
const validatePostData = require('../../middlewares/validatePostData');
const { validateToken } = require('../../auth/token');
const BlogPost = require('../../controllers/blogPost');

const router = Router();

router
  .post('/', validateToken, validatePostData, rescue(BlogPost.register))
  // .get('/:id', validateToken, rescue(User.findById))
  .get('/', validateToken, rescue(BlogPost.findAll));

module.exports = router;
