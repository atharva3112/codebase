const path = require('path');
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// swaggerDocument.basePath = process.env.AUTHENTICATION_EXPRESS_ENDPOINT;

for (const endpoint in swaggerDocument.paths) {
  if (swaggerDocument.paths[endpoint]['$ref']) {
    const definition = YAML.load(
      path.join(__dirname, swaggerDocument.paths[endpoint]['$ref'])
    );
    swaggerDocument.paths[endpoint] = definition;
  }
}

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
