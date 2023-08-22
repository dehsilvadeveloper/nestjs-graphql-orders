import { AppConfigProps } from './interfaces/config.interface';

export const appConfig = (): AppConfigProps => ({
  environment: process.env.APP_ENV || 'local',
  debug: process.env.APP_DEBUG === 'true',
  name: process.env.APP_NAME || 'nestjs-application',
  displayName: process.env.APP_DISPLAY_NAME || 'NestJS Application',
  description: process.env.APP_DESCRIPTION || 'nestjs app description',
  timezone: process.env.APP_TIMEZONE || 'America/Sao_Paulo',
  http: {
    url: process.env.APP_URL || 'http://localhost',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  },
  globalPrefix: process.env.API_GLOBAL_PREFIX || 'api',
  versioning: {
    enable: process.env.API_VERSIONING_ENABLE === 'true',
    prefix: 'v',
    version: process.env.API_DEFAULT_VERSION ?? '1',
  },
});
