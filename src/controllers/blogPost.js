const BlogPost = require('../services/blogPost');
const HTTP_STATUS_CODE = require('../consts/httpStatusCode');

const findAll = async (req, res) => {
  const blogPosts = await BlogPost.findAll();

  res.status(HTTP_STATUS_CODE.ok).json(blogPosts);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const blogPosts = await BlogPost.findById(id);

  if (blogPosts.error) return next({ error: blogPosts.error });

  res.status(HTTP_STATUS_CODE.ok).json(blogPosts);
};

const register = async (req, res, next) => {
  const { body: { title, content, categoryIds }, user: { dataValues: { id: userId } } } = req;

  const blogPost = await BlogPost.register(title, content, categoryIds, userId);

  if (blogPost.error) return next({ error: blogPost.error });

  res.status(HTTP_STATUS_CODE.created).json(blogPost);
};

const remove = async (req, res, next) => {
  const { params: { id: postId }, user: { dataValues: { id: userId } } } = req;

  const blogPosts = await BlogPost.remove(postId, userId);

  if (blogPosts.error) return next({ error: blogPosts.error });

  res.status(HTTP_STATUS_CODE.noContent).end();
};

const searchPost = async (req, res) => {
  const { q } = req.query;

  const post = await BlogPost.findByQuery(q);

  console.log('\n\n\n\nn\n\n\n\n\\n\n\n\nPOST:', post, '\n\n\n\n\n\n\n\n\n\n\n\n');
  res.status(HTTP_STATUS_CODE.ok).json(post);
};

const update = async (req, res, next) => {
  const {
    body: { title, content },
    params: { id: postId },
    user: { dataValues: { id: userId } },
  } = req;

  const blogPosts = await BlogPost.update(postId, title, content, userId);

  if (blogPosts.error) return next({ error: blogPosts.error });

  res.status(HTTP_STATUS_CODE.ok).json(blogPosts);
};

module.exports = { findAll, findById, register, remove, searchPost, update };
