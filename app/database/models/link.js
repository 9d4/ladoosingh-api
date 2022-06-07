'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Link extends Model {}

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
      modelName: 'link',
    }
  );

  Link.associate = (models) => {
    Link.hasMany(models.history);
  }

  return Link;
};
