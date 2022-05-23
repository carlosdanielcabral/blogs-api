const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return Categories;
}

module.exports = Categories;
