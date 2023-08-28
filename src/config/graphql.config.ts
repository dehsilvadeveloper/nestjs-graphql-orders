import { GraphqlConfigProps } from './interfaces/config.interface';

export const graphqlConfig = (): GraphqlConfigProps => ({
  playgroundEnabled: process.env.GRAPHQL_PLAYGROUND_ENABLED === 'true',
  schemaOutputDir: process.env.GRAPHQL_SCHEMA_OUTPUT_DIR || 'graphql/',
  schemaOutputFile: process.env.GRAPHQL_SCHEMA_OUTPUT_FILE || 'schema.graphql',
  debugEnabled: process.env.GRAPHQL_DEBUG_ENABLED === 'true',
  sortSchemaEnabled: process.env.GRAPHQL_SORT_SCHEMA_ENABLED === 'true',
});
