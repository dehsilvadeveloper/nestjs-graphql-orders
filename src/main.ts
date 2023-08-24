import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create application instance
  const app = await NestFactory.create(AppModule);

  // Preparing config service
  const configService = app.get<ConfigService>(ConfigService);

  // Getting app config data
  const appUrl: string = configService.getOrThrow<string>('app.http.url');
  const appPort: number = configService.getOrThrow<number>('app.http.port');
  const appGlobalPrefix: string = configService.getOrThrow<string>('app.globalPrefix');
  const appVersioningEnable: boolean = configService.getOrThrow<boolean>('app.versioning.enable');
  const appVersionPrefix: string = configService.getOrThrow<string>('app.versioning.prefix');
  const appVersion: string = configService.getOrThrow<string>('app.versioning.version');

  // Getting cors config data
  const corsEnabled: boolean = configService.getOrThrow<boolean>('cors.enabled');

  // Defining app full base url
  let appFullBaseUrl = `${appUrl}:${appPort}/${appGlobalPrefix}`;

  // API global prefix
  app.setGlobalPrefix(appGlobalPrefix);

  // API versioning
  if (appVersioningEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      prefix: appVersionPrefix,
      defaultVersion: appVersion,
    });

    // Complementing app full base url
    appFullBaseUrl = `${appFullBaseUrl}/${appVersionPrefix}${appVersion}`;
  }

  // Validation pipeline
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Enable shutdown hook explicitly
  app.enableShutdownHooks();

  // Cors
  if (corsEnabled) {
    app.enableCors();
  }

  // Application port
  await app.listen(appPort, () => {
    console.info(`Server ready at: ${appFullBaseUrl}`);
  });
}

bootstrap();
