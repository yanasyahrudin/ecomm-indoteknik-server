'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.AdminSeller, {
        foreignKey: 'adminSellerId',
        as: 'adminSeller'
      })
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'user'
      })
      User.hasOne(models.Cart, { // Add this association
        foreignKey: 'userId',
        as: 'cart'
      });
      User.hasMany(models.Checkout, {
        foreignKey: 'userId',
        as: 'users'
      })
    }
  }
  User.init({
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Full Name is required' },
        notNull: { msg: 'Full Name is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { message: 'Email must be unique' },
      validate: {
        isEmail: { msg: 'Invalid email format' },
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password must be between 6 and 100 characters long',
        },
      },
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
    imageProfile: DataTypes.STRING,
    role: DataTypes.STRING,
    adminSellerId: DataTypes.INTEGER,
    purchasePoints: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(instance => {
    instance.password = hash(instance.password)
  })
  return User;
};