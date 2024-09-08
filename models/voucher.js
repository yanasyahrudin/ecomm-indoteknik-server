'use strict';
const {
  Model
} = require('sequelize');
const adminseller = require('./adminseller');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.belongsTo(models.ProductCart, {
        foreignKey: 'productCartId',
        as: 'productCart',
      });
    }
  }
  Voucher.init({
    voucherCode: DataTypes.STRING,
    image: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    description: DataTypes.STRING,
    productCartId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};