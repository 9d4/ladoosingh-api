const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config/config.js')[env];
const db = {};

let sequelize; 

const init = () => {
  return new Promise((resolve, reject) => {
    try {
      sequelize = new Sequelize(config.url, { logging: env === 'development' ? console.log : false });

      db['link'] = require('./link')(sequelize, DataTypes);
      db['history'] = require('./history')(sequelize, DataTypes);

      Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });

      db.sequelize = sequelize;
      db.Sequelize = Sequelize;
    } catch (err) {
      reject(err);
    }

    resolve(db);
  });
}

/**
 * @returns {import('sequelize').Model[]}
 */
const getModels = () => {
  return db;
}

module.exports = { db, getModels, init };
