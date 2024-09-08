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
    await queryInterface.removeColumn('Checkouts', 'discountVouchers')
    await queryInterface.removeColumn('Checkouts', 'subTotal')
    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Checkouts', 'discountVouchers', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
    await queryInterface.addColumn('Checkouts', 'subTotal', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  }
};
