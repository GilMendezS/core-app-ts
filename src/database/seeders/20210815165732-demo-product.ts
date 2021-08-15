'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Crédito',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Débito',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Chequera',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
