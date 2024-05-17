'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.roles, {
        foreignKey: "role_id",
        as:"role"
      });

    }
  }
  User.init({
    role_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    aadhar_no: DataTypes.STRING,
    status: DataTypes.STRING,
    dob: DataTypes.DATE,
    blood_group: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },
    deletedAt: {
        field: 'deleted_at',
        type: DataTypes.DATE,
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'users',
  });
  return User;
};