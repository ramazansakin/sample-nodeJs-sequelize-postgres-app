'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {

    static associate(models) {
      Reviews.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      Reviews.belongsTo(models.Books, {
        foreignKey: 'bookId'
      });

      Reviews.hasMany(models.Votes, {
        foreignKey: 'reviewId',
        as: 'reviewvotes'
      });

    }
  };
  Reviews.init({
    review: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};