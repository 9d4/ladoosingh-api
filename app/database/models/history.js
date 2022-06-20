const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class History extends Model {}

  History.init({
    data: {
      type: DataTypes.JSON,
    },
  }, { sequelize, modelName: 'history' });
  
  History.afterCreate((history, options) => {
    // check if the history count is more than 50
    // delete the older histories
    const popHistory = async () => {
      const histories = await History.getHistoryByLinkId(history.linkId, 'ASC');
      if (histories.length > 50) {
        const oldestHistory = histories[0];
        await oldestHistory.destroy();
        await popHistory();
      }
    }
     
    return popHistory();
  });

  History.getHistoryByLinkId = function (linkId, order = 'DESC') {
    return this.findAll({
      where: {
        linkId,
      },
      order: [['updatedAt', order]],
    });
  }

  return History;
};
