'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('posts', 'text', {
      type: Sequelize.STRING(10000)
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('posts', 'text', {
      type: Sequelize.STRING(1000)
    })
  }
};
