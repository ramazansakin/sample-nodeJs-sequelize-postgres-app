'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {

    static associate(models) {
      Rate.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: "CASCADE"
      });

      Rate.belongsTo(models.Books, {
        foreignKey: 'bookId',
        onDelete: "CASCADE"
      });
    }
  };
  Rate.init({
    rate: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rate',
  });
  return Rate;
};