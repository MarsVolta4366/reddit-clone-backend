'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      comment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: { model: 'posts', key: 'post_id' },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'user_id' },
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};