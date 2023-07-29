export const apiConfig = {
  name: process.env.API_NAME || 'api name',
  description: process.env.API_DESCRIPTION || 'api description',
  globalPrefix: process.env.API_GLOBAL_PREFIX || 'api',
  defaultVersion: process.env.API_DEFAULT_VERSION || '1',
};
