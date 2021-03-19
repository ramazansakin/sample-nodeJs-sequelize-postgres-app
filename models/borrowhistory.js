'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrowhistory extends Model {

    static associate(models) {
      Borrowhistory.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      Borrowhistory.belongsTo(models.Books, {
        foreignKey: 'bookId'
      });
    }
  };
  Borrowhistory.init({
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    borrowedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Borrowhistory',
  });
  return Borrowhistory;
};