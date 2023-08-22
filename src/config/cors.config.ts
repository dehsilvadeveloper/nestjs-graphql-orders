import { CorsConfigProps } from './interfaces/config.interface';

export const corsConfig = (): CorsConfigProps => ({
  enabled: process.env.CORS_ENABLED === 'true',
});
