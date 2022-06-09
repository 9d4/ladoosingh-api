require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');
const { init: initDB } = require('./app/database/models');
const { initLinkWS } = require('./app/link/ws');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  });

  server.route(routes);
  await server.register(Nes);
  initLinkWS(server);

  try {
    await initDB();
    await server.start();
    process.stdout.write(`Listening ${server.info.uri}\n`);
  } catch (err) {
    process.stdout.write(`${err.stack}\n`);
  }
};

init();
