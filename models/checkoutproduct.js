'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckoutProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CheckoutProduct.belongsTo(models.Checkout, {
        foreignKey: 'checkoutId',
        as: 'checkouts'
      });
      CheckoutProduct.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'products'
      });
    }
  }
  CheckoutProduct.init({
    checkoutId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CheckoutProduct',
  });
  return CheckoutProduct;
};