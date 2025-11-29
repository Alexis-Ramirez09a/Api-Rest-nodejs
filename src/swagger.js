const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API REST Node.js',
        description: 'Documentación generada automáticamente',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Ingrese su token JWT aquí'
        }
    },
    security: [{ "bearerAuth": [] }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
