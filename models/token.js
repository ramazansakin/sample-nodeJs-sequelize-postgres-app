'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {

    static associate(models) {
      // define association here
    }
  };
  Token.init({
    token: DataTypes.STRING,
    blacklistedOn: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};