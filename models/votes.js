'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {

    static associate(models) {
      
      Votes.belongsTo(models.Reviews, {
        foreignKey: 'reviewId',
        onDelete: "CASCADE"
      });

    }
  };
  Votes.init({
    liked: DataTypes.BOOLEAN,
    reviewId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Votes',
  });
  return Votes;
};