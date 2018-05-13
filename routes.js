var swaggerJSDoc = require('swagger-jsdoc');
// var host = require('./api/auth/google.server.config').google.callbackURL.split('/api')[0].split("//")[1];
var host = require("./views/config").getRootUrl();

var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
        contact: {
            email: "khangpqmse0086@fpt.edu.vn",
            phone: "0981604050"
        }

    },
    host: host,
    basePath: '/',
    tags: [{
        name: "Text Recorgnize",
        description: "Text Recorgnize APIs"
    }]
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./api/tesseract/*.js'],
};


// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

module.exports = function (app) {
    app.use("/api/tesseract", require("./api/tesseract"));
    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}