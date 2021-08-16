'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      product_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'products'
          },
          key: 'id'
        },
        allowNull: false
      },
      balance: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.ENUM('active','inactive')
      },
      nip: {
        type: Sequelize.STRING,
      },
      customer_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'customers'
          },
          key: 'id'
        },
        allowNull: false
      },
      external: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};