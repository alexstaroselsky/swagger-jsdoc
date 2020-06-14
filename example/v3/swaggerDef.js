/* istanbul ignore next */
// This file is an example, it's not functionally used by the module.This

const host = `http://${process.env.IP}:${process.env.PORT}`;

module.exports = {
  openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
  info: {
    // API informations (required)
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host, // Host (optional)
  basePath: '/', // Base path (optional),
  apis: ['./example/v3/routes*.js', './example/v3/parameters.yaml'],
  typePaths: ['./example/v3/types/**/*.ts'],
  types: ['Login'],
};
