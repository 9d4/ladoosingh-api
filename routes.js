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
    ];
}

module.exports = routes();
