'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('estabelecimentos', { 
      
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id:{
        type: Sequelize.INTEGER,
        references:{model: 'users' , key: 'id'},
        allowNull : false,
        onDelete:'cascade'
      },
      nome:{
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      descricao:{
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('estabelecimentos');
  }
};
