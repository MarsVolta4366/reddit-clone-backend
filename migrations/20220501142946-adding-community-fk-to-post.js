'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'community_id', {
      type: Sequelize.INTEGER,
      references: { model: 'communities', key: 'community_id' }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('posts', 'community_id')
  }
};
