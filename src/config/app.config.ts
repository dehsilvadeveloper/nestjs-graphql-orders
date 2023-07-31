import { toBoolean } from '@shared/helpers/toBoolean';

export const appConfig = {
  environment: process.env.APP_ENV || 'local',
  debug: process.env.APP_DEBUG ? toBoolean(process.env.APP_DEBUG) : false,
  name: process.env.APP_NAME || 'nestjs-application',
  url: process.env.APP_URL || 'http://localhost',
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  timezone: process.env.APP_TIMEZONE || 'America/Sao_Paulo',
};
