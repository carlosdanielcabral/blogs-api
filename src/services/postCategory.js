const { PostCategory } = require('../../models');

const register = async (postId, categoryId) => PostCategory.create({ postId, categoryId });

module.exports = { register };
