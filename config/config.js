require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URI_DEV,
    dialect: process.env.DB_DIALECT_DEV,
  },
  test: {
    url: process.env.DB_URI_TEST,
    dialect: process.env.DB_DIALECT_TEST,
  },
  production: {
    url: process.env.DB_URI_PROD,
    dialect: process.env.DB_DIALECT_PROD,
  },
};
