import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
// swagger config
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API Description',
    },
    "components": {
      "securitySchemes": {
        "apiKeyAuth": {
          "type": "apiKey",
          "in": "header",
          "name": "Token"
        }
      }
    }
  },
  apis: [path.join(__dirname, '../router/*.ts'), path.join(__dirname, '../router/*/*.ts')],
};
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
