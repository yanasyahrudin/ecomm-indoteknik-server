'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventProduct.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'events',
      })
      EventProduct.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'eventProducts',
      })
    }
  }
  EventProduct.init({
    eventId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventProduct',
  });
  return EventProduct;
};