'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test_reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.users, {
        foreignKey: "user_id",
        as: "user"
      });

      this.belongsTo(models.Prescriptions, {
        foreignKey: "prescription_id",
        as: "prescriptions"
      });


    }
  }
  test_reports.init({
    user_id: DataTypes.INTEGER,
    prescription_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    images: {
      type: DataTypes.TEXT,
      get() {
        const data = this.getDataValue('images');
        try {
          return JSON.parse(data);
        } catch (err) {
          return data;
        }
      },
      set(value) {
        this.setDataValue('images', JSON.stringify(value));
      }
    },
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
    modelName: 'test_reports',
  });
  return test_reports;
};