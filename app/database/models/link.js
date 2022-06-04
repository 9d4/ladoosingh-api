'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this has many histories
      Link.hasMany(models.History, {
        foreignKey: 'linkId',
      });
    }
  }

  Link.init(
    {
      linkId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Link',
    }
  );

  return Link;
};
