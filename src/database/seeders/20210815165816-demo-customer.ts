'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
     * 
    */
   
   await queryInterface.bulkInsert('customers', [{
       first_name: 'Gil',
       primary_last_name: 'mdz',
       second_last_name: 'stz',
       phone: '3321231230',
       created_at: new Date(),
       updated_at: new Date()
     },
     {
      first_name: 'Juanito',
      primary_last_name: 'Perez',
      second_last_name: 'Hdz',
      phone: '3321231234',
      created_at: new Date(),
      updated_at: new Date()
    }
    ], {})
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
