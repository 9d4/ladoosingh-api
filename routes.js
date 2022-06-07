const { createNewLink } = require('./app/link/handler');

/**
 * Contains all the routes for the application.
 *
 * @returns {import('@hapi/hapi').ServerRoute[]}}
 */
const routes = () => [
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
    path: '/{any*}',
    method: '*',
    handler: (req, res) => res.response({ error: 'Not found' }).code(404),
  },
];

module.exports = routes();
