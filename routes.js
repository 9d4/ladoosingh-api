const { createNewLink, linkHook } = require('./app/link/handler');

/**
 * Contains all the routes for the application.
 *
 * @returns {import('@hapi/hapi').ServerRoute[]}}
 */
const routes = () => [
  {
    path: '/ping',
    method: 'GET',
    handler: (req, res) => res.response('pong').code(200),
  },
  {
    path: '/',
    method: 'GET',
    handler: () => 'Welcome!',
  },
  {
    path: '/links',
    method: 'POST',
    handler: createNewLink,
  },
  {
    path: '/l/{linkId}',
    method: '*',
    handler: linkHook,
  },
  {
    path: '/{any*}',
    method: '*',
    handler: (req, res) => res.response({ error: 'Not found' }).code(404),
  },
];

module.exports = routes();
