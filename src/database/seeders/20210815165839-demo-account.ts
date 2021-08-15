'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('accounts', [
      {
        account_number: "12345678901234567",
        product_id: 1,
        balance: 15999.99,
        status: "active",
        nip: "1111",
        customer_id: 2,
        external: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_number: "12345678901234101",
        product_id: 2,
        balance: 1000.00,
        status: "active",
        nip: "5678",
        customer_id: 2,
        external: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_number: "12345678901234901",
        product_id: 3,
        balance: 500.00,
        status: "active",
        nip: "1234",
        customer_id: 2,
        external: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_number: "12345678901216781",
        product_id: 2,
        status: "active",
        customer_id: 2,
        external: true,
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
