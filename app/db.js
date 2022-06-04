const { Sequelize } = require('sequelize');

let DB;

const connectDB = async (dbUri) => {
  const sql = new Sequelize(dbUri);

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

const getDB = () => DB;

module.exports = { connectDB, setDB, getDB };
