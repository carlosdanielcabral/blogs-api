const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return Category;
}

module.exports = Category;
