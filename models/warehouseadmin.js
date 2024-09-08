'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class WarehouseAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WarehouseAdmin.hasMany(models.Product, {
        foreignKey: 'authorId',
        as: 'authors'
      })
    }
  }
  WarehouseAdmin.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WarehouseAdmin',
  });
  WarehouseAdmin.beforeCreate(instance => {
    instance.password = hash(instance.password)
  })
  return WarehouseAdmin;
};