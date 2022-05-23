const Op = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../database/models');
const ERRORS = require('../consts/errors');

const findAll = async () => BlogPost.findAll({
  include: [{
    model: User,
    as: 'user',
    attributes: ['id', 'displayName', 'email', 'image'],
  }, {
    model: PostCategory,
    as: 'categories',
  }],
});

const findByField = async (q, value) => BlogPost.findOne({
  where: {
    [q]: { [Op.like]: `%${value}%` },
  },
});

const findById = async (id) => {
  const blogPost = User.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    }, {
      model: PostCategory,
      as: 'categories',
    }],
  });

  if (!blogPost) return { error: ERRORS.postNotFound };

  return blogPost;
};

const register = async (title, content, categoryIds, userId) => {
  const blogPost = await BlogPost.create({ title, content, userId });

  const categories = await Promise.all(categoryIds.map((categoryId) => 
    Category.findById(categoryId)));

  const { error } = categories.find((category) => category.error);

  if (error) return { error };

  await Promise.all(categoryIds.map((categoryId) =>
    PostCategory.register(blogPost.id, categoryId)));

  return blogPost;
};

const remove = async (postId, userId) => {
  const post = findById(postId);

  if (post.error) return { error: post.error };

  if (post.userId !== userId) return { error: ERRORS.unauthorizedUser };
};

const update = async (id, title, content, userId) => {
  const blogPost = findById(id);

  if (blogPost.error) return { error: blogPost.error };

  if (blogPost.userId !== userId) return { error: ERRORS.unauthorizedUser };

  return BlogPost.update({
    title, content,
  }, {
    where: { id },
  });
};

module.exports = { findAll, findByField, findById, register, remove, update };
