'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.STRING(1000)
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.TEXT
    })
  }
};
