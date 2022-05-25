const { Router } = require('express');
const rescue = require('express-rescue');
const validatePostData = require('../../middlewares/validatePostData');
const validatePostDataUpdate = require('../../middlewares/validatePostDataUpdate');
const { validateToken } = require('../../auth/token');
const BlogPost = require('../../controllers/blogPost');

const router = Router();

router
  .post('/', validateToken, validatePostData, rescue(BlogPost.register))
  .get('/search', validateToken, rescue(BlogPost.searchPost))
  .get('/:id', validateToken, rescue(BlogPost.findById))
  .get('/', validateToken, rescue(BlogPost.findAll))
  .put('/:id', validateToken, validatePostDataUpdate, rescue(BlogPost.update))
  .delete('/:id', validateToken, rescue(BlogPost.remove));

module.exports = router;
