'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Checkouts', 'subTotal', {
      type: Sequelize.INTEGER,
    })
    await queryInterface.addColumn('Checkouts', 'shippingCost', {
      type: Sequelize.INTEGER,
    })
    await queryInterface.addColumn('Checkouts', 'discountVoucher', {
      type: Sequelize.INTEGER,
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Checkouts', 'subTotal', null)
    await queryInterface.removeColumn('Checkouts', 'shippingCost', null)
    await queryInterface.removeColumn('Checkouts', 'discountVoucher', null)
  }
  
};
