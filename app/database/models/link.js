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

  Link.beforeCreate((instance, options) => {
    const after = 1000 * 60 * 60 * 24 * 3; // 3 days
    instance.expiredAt = new Date(Date.now() + after);
  });

  return Link;
};
