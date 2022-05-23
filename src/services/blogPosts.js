import Op from 'sequelize';
import { BlogPosts, PostCategories, User } from '../database/models';
import ERRORS from '../consts/errors';

const findAll = async () => BlogPosts.findAll({
  include: [{
    model: User,
    as: 'user',
    attributes: ['id', 'displayName', 'email', 'image'],
  }, {
    model: PostCategories,
    as: 'categories',
  }],
});

const findByField = async (q, value) => BlogPosts.findOne({
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
      model: PostCategories,
      as: 'categories',
    }],
  });

  if (!blogPost) return { error: ERRORS.postNotFound };

  return blogPost;
};

// const login = async (email, password) => {
//   const user = await User.findOne({ where: { email } });

//   if (!user || user.password !== password) return { error: ERRORS.invalidFields };

//   return user;
// };

const register = async (title, content, categoryIds) => {
  const blogPost = await BlogPosts.create({ title, content });
  const categories = categoryIds.map((categoryId) =>
    PostCategories.register(blogPost.id, categoryId));

  await Promise.all(categories);

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

  return blogPost.update({
    title, content,
  }, {
    where: { id },
  });
};

module.exports = { findAll, findByField, findById, register, remove, update };
