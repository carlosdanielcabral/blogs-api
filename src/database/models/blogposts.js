const BlogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated'
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users'
    }),

    BlogPosts.hasMany(models.PostCategories, {
      foreignKey: 'postId',
      as: 'postCategories'
    })
  }
}

module.exports = BlogPosts;
