import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API Description',
    },
  },
  apis: [path.join(__dirname, '../router/*.ts'), path.join(__dirname, '../router/*/*.ts')],
};
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
