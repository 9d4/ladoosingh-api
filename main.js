require('dotenv').config();

const Hapi = require('@hapi/hapi');
const { init: initDB } = require('./app/database/models');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000,
  });

  server.route(routes);

  try {
    await initDB();
    await server.start();
    process.stdout.write(`Listening ${server.info.uri}\n`);
  } catch (err) {
    process.stdout.write(`${err.stack}\n`);
  }
};

init();
