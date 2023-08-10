import { toBoolean } from '@shared/helpers/toBoolean';

export const graphqlConfig = {
  playgroundEnabled: process.env.GRAPHQL_PLAYGROUND_ENABLED
    ? toBoolean(process.env.GRAPHQL_PLAYGROUND_ENABLED)
    : false,
  schemaOutputDir: process.env.GRAPHQL_SCHEMA_OUTPUT_DIR || 'graphql/',
  schemaOutputFile: process.env.GRAPHQL_SCHEMA_OUTPUT_FILE || 'schema.graphql',
};

console.log('GRAPHQL_PLAYGROUND_ENABLED no config:', process.env.GRAPHQL_PLAYGROUND_ENABLED);
