const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class History extends Model {}

  History.init({
    data: {
      type: DataTypes.JSON,
    },
  }, { sequelize, modelName: 'history' });
  
  History.getHistoryByLinkId = function (linkId) {
    return this.findAll({
      where: {
        linkId,
      },
      order: [['updatedAt', 'DESC']],
    });
  }

  return History;
};
