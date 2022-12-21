const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json');

const swaggerDocs = (app, port) => {
    app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
}

module.exports = { swaggerDocs }