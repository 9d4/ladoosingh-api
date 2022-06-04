const { Sequelize } = require('sequelize');

let DB;

const connectDB = async (dbUri) => {
  const sql = new Sequelize(dbUri, {
    logging: process.env.NODE_ENV === 'development',
  });

  await sql.authenticate();

  return sql;
};

/**
 * Set the DB instance
 * @param {import('sequelize').Sequelize} sql
 * @returns {void}
 */
const setDB = (sql) => {
  DB = { ...sql };
};

/**
 * Get the global DB instance
 *
 * @returns {import{'sequelize'.Sequelize}}
 */
const getDB = () => DB;

module.exports = { connectDB, setDB, getDB };
