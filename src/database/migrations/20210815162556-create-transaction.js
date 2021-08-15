'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      origin_account: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'accounts'
          },
          key: 'id'
        },
        allowNull: false
      },
      destination_account: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'accounts'
          },
          key: 'id'
        },
        allowNull: false
      },
      type: {
        type: Sequelize.DataTypes.ENUM('cargo', 'abono'),
        allowNull: false
      },
      amount: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },
      concept: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      reference: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      operation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.ENUM('pendiente','aprobado', 'rechazado'),
        allowNull: false
      },
      details: {
        type: Sequelize.DataTypes.STRING,
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
    await queryInterface.dropTable('Transactions');
  }
};