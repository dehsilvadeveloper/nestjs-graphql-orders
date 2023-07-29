import { toBoolean } from '@shared/helpers/toBoolean';

export const corsConfig = {
  enabled: process.env.CORS_ENABLED ? toBoolean(process.env.CORS_ENABLED) : false,
};
