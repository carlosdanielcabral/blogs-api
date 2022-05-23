const BlogPosts = require('../services/blogPosts');
const HTTP_STATUS_CODE = require('../consts/httpStatusCode');

const findAll = async (req, res) => {
  const blogPosts = await BlogPosts.findAll();

  res.status(HTTP_STATUS_CODE.ok).json(blogPosts);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const blogPosts = await BlogPosts.findById(id);

  if (blogPosts.error) return next({ error: blogPosts.error });

  res.status(HTTP_STATUS_CODE.ok).json(blogPosts);
};

const register = async (req, res, next) => {
  const { body: { title, content, categoryIds }, user: { id: userId } } = req;

  const blogPost = await BlogPosts.register(title, content, categoryIds, userId);

  if (blogPost.error) return next({ error: blogPost.error });

  res.status(HTTP_STATUS_CODE.created).json(blogPost);
};

const remove = async (req, res, next) => {
  const { params: { id: postId }, user: { id: userId } } = req;

  const blogPosts = await BlogPosts.remove(postId, userId);

  if (blogPosts.error) return next({ error: blogPosts.error });

  res.status(HTTP_STATUS_CODE.noContent).end();
};

module.exports = { findAll, findById, register, remove };
