import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { appConfig } from './infra/config/app.config';
import { apiConfig } from './infra/config/api.config';
import { corsConfig } from './infra/config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API prefix and versioning
  app.setGlobalPrefix(apiConfig.globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiConfig.defaultVersion,
  });

  // Validation pipeline
  app.useGlobalPipes(new ValidationPipe());

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  // Application port
  await app.listen(appConfig.port);
}

bootstrap();
