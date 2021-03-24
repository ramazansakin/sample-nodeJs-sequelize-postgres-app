'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {

    static associate(models) {
      Books.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: "CASCADE"
      });

      Books.hasMany(models.Borrowhistory, {
        foreignKey: 'bookId',
        as : "bookborrows"
      });

      Books.hasMany(models.Reviews, {
        foreignKey: 'bookId',
        as : "bookreviews"
      });

      Books.hasMany(models.Rate, {
        foreignKey: 'bookId',
        as : "bookrates"
      });
    }
  };
  Books.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    isBorrowed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};