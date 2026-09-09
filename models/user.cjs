'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, { foreignKey: 'userId' });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      return values;
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Must be a valid email address.' },
        notEmpty: { msg: 'Email cannot be empty.' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password cannot be empty.' }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'member'
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};