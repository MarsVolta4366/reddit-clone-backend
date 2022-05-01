'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      Community.hasMany(Post, {
        foreignKey: 'community_id'
      })
    }
  }
  Community.init({
    community_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    community_name: {
      type: DataTypes.STRING(21),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Community',
    tableName: 'communities'
  });
  return Community;
};