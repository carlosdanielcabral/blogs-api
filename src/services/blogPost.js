const Op = require('sequelize');
const {
  BlogPost,
  Category: CategoryModel,
  User,
} = require('../database/models');
const Category = require('./category');
const PostCategory = require('./postCategory');
const ERRORS = require('../consts/errors');

const findAll = async () => BlogPost.findAll({
  include: [{
    model: User,
    as: 'user',
    attributes: ['id', 'displayName', 'email', 'image'],
  }, {
    model: CategoryModel,
    as: 'categories',
  }],
});

const findByField = async (q, value) => BlogPost.findOne({
  where: {
    [q]: { [Op.like]: `%${value}%` },
  },
});

const findById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    }, {
      model: CategoryModel,
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

  const error = categories.find((category) => category.error);

  if (error) return error;

  await Promise.all(categoryIds.map((categoryId) =>
    PostCategory.register(blogPost.id, categoryId)));

  return blogPost;
};

const remove = async (postId, userId) => {
  const post = await findById(postId);

  if (post.error) return { error: post.error };

  if (post.userId !== userId) return { error: ERRORS.unauthorizedUser };

  await BlogPost.destroy({ where: { id: userId } });

  return post;
};

const update = async (id, title, content, userId) => {
  const blogPost = await findById(id);

  if (blogPost.error) return { error: blogPost.error };

  if (blogPost.userId !== userId) return { error: ERRORS.unauthorizedUser };

  await BlogPost.update({
    title, content,
  }, {
    where: { id },
  });

  return findById(id);
};

module.exports = { findAll, findByField, findById, register, remove, update };
