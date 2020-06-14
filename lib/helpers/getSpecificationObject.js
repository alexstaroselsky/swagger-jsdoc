const _ = require('lodash');
const tjs = require('typescript-json-schema');
const createSpecification = require('./createSpecification');
const parseApiFile = require('./parseApiFile');
const convertGlobPaths = require('./convertGlobPaths');
const finalizeSpecificationObject = require('./finalizeSpecificationObject');
const updateSpecificationObject = require('./updateSpecificationObject');

function getSpecificationObject(options) {
  // Get input definition and prepare the specification's skeleton
  const definition = options.swaggerDefinition || options.definition;
  const isV3 = definition.openapi === '3.0.0';
  const specification = createSpecification(definition);

  // Parse the documentation containing information about APIs.
  const apiPaths = convertGlobPaths(options.apis);
  // Parse the documentation containing information about types
  const typePaths = convertGlobPaths(options.typePaths);

  const settings = {
    required: true,
    topRef: true,
  };
  const program = tjs.getProgramFromFiles(typePaths);

  // TODO - determine how to generate parameters schema
  for (let i = 0; i < options.types.length; i += 1) {
    const type = options.types[i];
    const schema = tjs.generateSchema(program, type, settings);
    const { $schema, ...rest } = schema;
    if (isV3) {
      specification.components.schemas = {
        ..._.get(specification, 'components.schemas'),
        ...rest.definitions,
      };
    } else {
      specification.definitions = {
        ...specification.definitions,
        ...rest.definitions,
      };
    }
  }

  for (let i = 0; i < apiPaths.length; i += 1) {
    const parsedFile = parseApiFile(apiPaths[i]);
    updateSpecificationObject(parsedFile, specification);
  }

  return finalizeSpecificationObject(specification);
}

module.exports = getSpecificationObject;
