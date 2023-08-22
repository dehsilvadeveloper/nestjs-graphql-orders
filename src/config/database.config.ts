import { DatabaseConfigProps } from './interfaces/config.interface';

export const databaseConfig = (): DatabaseConfigProps => ({
  host: process.env.DB_HOST || 'localhost',
});
