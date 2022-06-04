'use strict';

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    });

    server.route(routes);

    await server.start();
    console.log(`Listening ${server.info.uri}`);
}

init();
