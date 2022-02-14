'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasOne(models.roles),{
        foreignKey: 'user_id',
        as: 'role',
      }
      // define association here
    }
  }
  users.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    token:  {
      type: DataTypes.STRING
      
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};