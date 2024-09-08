'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductOwner.hasMany(models.Product, {
        foreignKey: 'productOwnerId',
        as: 'product_owners'
      })
    }
  }
  ProductOwner.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    paymentGatewayId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductOwner',
  });
  return ProductOwner;
};