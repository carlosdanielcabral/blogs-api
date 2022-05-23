const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    type: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return Category;
}

module.exports = Category;
