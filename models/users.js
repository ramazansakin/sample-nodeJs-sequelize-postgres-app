'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
    static associate(models) {
      Users.hasMany(models.Books, {
        foreignKey: 'userId',
        as: 'books'
      });

      Users.hasMany(models.Borrowhistory, {
        foreignKey: 'userId',
        as: 'userborrows'
      });

      Users.hasMany(models.Reviews, {
        foreignKey: 'userId',
        as: 'userreviews'
      });

      Users.hasMany(models.Rate, {
        foreignKey: 'userId',
        as: 'userrates'
      });

      Users.hasOne(models.Votes, {
        foreignKey: 'userId',
        as: 'uservote'
      });

      Users.hasOne(models.Usersban, {
        foreignKey: 'userId',
        as: 'userban'
      });
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    readingPoints: DataTypes.INTEGER,
    avatarPath: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};