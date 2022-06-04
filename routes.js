/**
 * Contains all the routes for the application.
 * 
 * @returns {import('@hapi/hapi').ServerRoute[]}}
 */
const routes = () => {
    return [
        {
            path: '/',
            method: 'GET',
            handler: (req, res) => {
                return "Welcome!";
            },
        },
        {
            path: '/{any*}',
            method: '*',
            handler: (req, res) => {
                // send 404
                return res.response({error: 'Not found'}).code(404);
            }
        }
    ];
}

module.exports = routes();
