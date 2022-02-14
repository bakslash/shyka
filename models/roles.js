'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsTo(models.users, {
        foreignKey: 'user_id',
        as: 'user'
      });
      // define association here
    }
  }
  roles.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};