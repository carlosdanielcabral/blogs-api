const PostCategories = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });

  PostCategories.associate = (models) => {
    PostCategories.belongsToMany(models.BlogPosts, {
      foreignKey: 'postId',
      as: 'blogPosts'
    }),

    PostCategories.belongsToMany(models.Categories, {
      foreignKey: 'categoryId',
      as: 'categories'
    })
  }
}

module.exports = PostCategories;
