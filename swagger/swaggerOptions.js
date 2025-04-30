export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Copilot Test Api`s',
        version: '1.0.0',
        description: 'API documentation for your Node.js app',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
        },
      ],
      tags:[
{
    name:'Auth',
    description:'Authontication related routes'
},
{
    name:'User',
    description:'User related routes'
}
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  