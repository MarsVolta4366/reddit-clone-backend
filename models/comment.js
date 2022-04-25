'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      // define association here
      Comment.belongsTo(Post, {
        foreignKey: "post_id",
        onDelete: 'CASCADE'
      })
      Comment.belongsTo(User, {
        foreignKey: "user_id"
      })
    }
  }
  Comment.init({
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments'
  });
  return Comment;
};