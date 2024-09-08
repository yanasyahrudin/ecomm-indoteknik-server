'use strict';
const { hash } = require('../helpers/bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminSeller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdminSeller.hasMany(models.User, {
        foreignKey: 'adminSellerId',
        as: 'adminSeller'
      })
      AdminSeller.hasMany(models.Voucher, { foreignKey: 'authorId' })
    }
  }
  AdminSeller.init({
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: { message: 'Full Name must be unique' },
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

    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    imageProfile: DataTypes.STRING,
    role: DataTypes.STRING,
    voucherCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdminSeller',
  });
  AdminSeller.beforeCreate(instance => {
    instance.password = hash(instance.password)
  })
  return AdminSeller;
};