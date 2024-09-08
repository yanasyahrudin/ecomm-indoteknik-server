'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductShipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductShipping.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      ProductShipping.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart'
      })
    }
  }
  ProductShipping.init({
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductShipping',
  });
  return ProductShipping;
};