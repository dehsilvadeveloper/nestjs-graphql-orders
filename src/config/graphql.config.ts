import { GraphqlConfigProps } from './interfaces/config.interface';

export const graphqlConfig = (): GraphqlConfigProps => ({
  playgroundEnabled: process.env.GRAPHQL_PLAYGROUND_ENABLED === 'true',
  schemaOutputDir: process.env.GRAPHQL_SCHEMA_OUTPUT_DIR || 'graphql/',
  schemaOutputFile: process.env.GRAPHQL_SCHEMA_OUTPUT_FILE || 'schema.graphql',
});

// https://github.com/andrechristikan/ack-nestjs-boilerplate/tree/main
