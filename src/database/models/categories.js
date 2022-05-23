const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  Categories.associate = (models) => {
    Categories.hasMany(models.PostCategories, {
      foreignKey: 'category',
      as: 'categories'
    })
  }

  return Categories;
}

module.exports = Categories;
