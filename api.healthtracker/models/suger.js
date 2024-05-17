'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "user_id",
        as:"user"
      });

    }
  }
  suger.init({
    user_id: DataTypes.INTEGER,
    FastingBloodSugerTest: DataTypes.INTEGER,
    RandomBloodSugerTest: DataTypes.INTEGER,
    date: DataTypes.DATE,
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
    modelName: 'suger',
  });
  return suger;
};