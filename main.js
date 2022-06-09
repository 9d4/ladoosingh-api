require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');
const http = require('http');
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

const selfPing = () => {
  try {
    http.get(`${process.env.APP_URL}/ping`, () => undefined);
  } catch (e) { process.stdout.write(`${e.stack}\n`); }
};

init().then(() => {
  const ival = 1000 * 60 * 15; // 15 minutes

  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      selfPing();
    }, ival);
  }
});
