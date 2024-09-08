'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.ProductCategory, {
        foreignKey: 'categoryId',
        as: 'categories'
      });
      Product.belongsTo(models.ProductType, {
        foreignKey: 'typeId',
        as: 'types'
      });
      Product.hasMany(models.OrderProduct, {
        foreignKey: 'productId',
        as: 'product_orders'
      });
      Product.hasMany(models.Wishlist, {
        foreignKey: 'productId',
        as: 'product'
      });
      Product.hasMany(models.ProductCart, {
        foreignKey: 'productId',
        as: 'product_carts'
      })
      Product.belongsTo(models.ProductOwner, {
        foreignKey: 'productOwnerId',
        as: 'product_owners'
      })
      Product.belongsTo(models.WarehouseAdmin, {
        foreignKey: 'authorId',
        as: 'authors'
      })
      Product.hasMany(models.CheckoutProduct, {
        foreignKey: 'productId',
        as: 'products'
      })
      Product.hasMany(models.EventProduct, {
        foreignKey: 'productId',
        as: 'eventProducts',
      })
    }
  }

  Product.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING,
    description: DataTypes.TEXT,
    minimumOrder: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER,
    costPrice: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    productOwnerId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};