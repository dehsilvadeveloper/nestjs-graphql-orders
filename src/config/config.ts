import { ConfigProps } from './interfaces/config.interface';
import { appConfig } from './app.config';
import { corsConfig } from './cors.config';
import { databaseConfig } from './database.config';
import { graphqlConfig } from './graphql.config';

export const config = (): ConfigProps => ({
  app: appConfig(),
  cors: corsConfig(),
  database: databaseConfig(),
  graphql: graphqlConfig(),
});
