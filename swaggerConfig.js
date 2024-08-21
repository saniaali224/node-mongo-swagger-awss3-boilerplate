import path from 'path';
import { fileURLToPath } from 'url';

import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the Swagger YAML file
const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const setupSwagger = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );
};

export default setupSwagger;
