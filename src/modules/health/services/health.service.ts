import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckResult, HealthCheckService, HttpHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '@database/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealth: HttpHealthIndicator,
    private readonly prismaHealth: PrismaHealthIndicator,
  ) {}

  async healthCheck(): Promise<HealthCheckResult> {
    return await this.healthCheckService.check([
      () => this.httpHealth.pingCheck('http', this.getAppBaseUrl(), { timeout: 3000 }),
      () => this.prismaHealth.pingCheck('database', this.prisma, { timeout: 3000 }),
    ]);
  }

  private getAppBaseUrl(): string {
    const appUrl: string = this.configService.getOrThrow<string>('app.http.url');
    const appPort: number = this.configService.getOrThrow<number>('app.http.port');
    const appGlobalPrefix: string = this.configService.getOrThrow<string>('app.globalPrefix');
    const appVersioningEnable: boolean = this.configService.getOrThrow<boolean>('app.versioning.enable');
    const appVersionPrefix: string = this.configService.getOrThrow<string>('app.versioning.prefix');
    const appVersion: string = this.configService.getOrThrow<string>('app.versioning.version');

    let appFullBaseUrl = `${appUrl}:${appPort}/${appGlobalPrefix}`;

    if (appVersioningEnable) {
      appFullBaseUrl = `${appFullBaseUrl}/${appVersionPrefix}${appVersion}`;
    }

    return appFullBaseUrl;
  }
}
