'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usersban extends Model {

    static associate(models) {
      // no association
    }
  };
  Usersban.init({
    banned: DataTypes.DATE,
    describtion: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usersban',
  });
  return Usersban;
};