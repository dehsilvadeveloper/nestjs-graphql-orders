export interface ConfigProps {
  app: AppConfigProps;
  cors: CorsConfigProps;
  pagination: PaginationConfigProps;
  database: DatabaseConfigProps;
  graphql: GraphqlConfigProps;
}

export interface AppConfigProps {
  environment: string;
  debug: boolean;
  name: string;
  displayName: string;
  description: string;
  timezone: string;
  http: {
    url: string;
    port: number;
  };
  globalPrefix: string;
  versioning: {
    enable: boolean;
    prefix: string;
    version: string;
  };
}

export interface CorsConfigProps {
  enabled: boolean;
}

export interface PaginationConfigProps {
  pageSize: number;
}

export interface DatabaseConfigProps {
  host: string;
}

export interface GraphqlConfigProps {
  playgroundEnabled: boolean;
  schemaOutputDir: string;
  schemaOutputFile: string;
  debugEnabled: boolean;
  sortSchemaEnabled: boolean;
}
