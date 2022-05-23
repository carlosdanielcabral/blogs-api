const { PostCategories } = require('../database/models');

const register = async (postId, categoryId) => PostCategories.create({ postId, categoryId });

module.exports = { register };
