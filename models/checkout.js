'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkout.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'users'
      })
      Checkout.hasMany(models.CheckoutProduct, {
        foreignKey: 'checkoutId',
        as: 'checkouts'
      });
    }
  }
  Checkout.init({
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    paymentStatus: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    shippingAddress: DataTypes.STRING,
    voucherCode: DataTypes.STRING,
    setPPN: DataTypes.STRING,
    shippingMethod: DataTypes.STRING,
    deliveryStatus: DataTypes.STRING,
    midtransCode: DataTypes.STRING,
    shippingCost: DataTypes.INTEGER,
    trackingNumber: DataTypes.STRING,
    isPickUpInStore: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};