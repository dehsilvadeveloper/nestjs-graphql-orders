import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HealthCheckService, HttpHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '@database/prisma/prisma.service';
import { HealthService } from './health.service';
import { prismaMock } from '@common/mocks/prisma.mock';

describe('HealthService', () => {
  let healthService: HealthService;
  let prismaService: PrismaService;
  let configService: ConfigService;
  let healthCheckService: HealthCheckService;
  let httpHealthIndicator: HttpHealthIndicator;
  let prismaHealthIndicator: PrismaHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn(),
          },
        },
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn(),
          },
        },
        {
          provide: HttpHealthIndicator,
          useValue: HttpHealthIndicator,
        },
        {
          provide: PrismaHealthIndicator,
          useValue: PrismaHealthIndicator,
        },
        HealthService,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    configService = module.get<ConfigService>(ConfigService);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    httpHealthIndicator = module.get<HttpHealthIndicator>(HttpHealthIndicator);
    prismaHealthIndicator = module.get<PrismaHealthIndicator>(PrismaHealthIndicator);
    healthService = module.get<HealthService>(HealthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(healthService).toBeDefined();
  });

  it('should return healthy status', async () => {
    const checkSpy = jest.spyOn(healthCheckService, 'check').mockResolvedValue({
      status: 'ok',
      info: {
        http: {
          status: 'up',
        },
        database: {
          status: 'up',
        },
      },
      error: {},
      details: {
        http: {
          status: 'up',
        },
        database: {
          status: 'up',
        },
      },
    });

    const healthCheckResult = await healthService.healthCheck();

    expect(checkSpy).toHaveBeenCalledTimes(1);

    expect(healthCheckResult.status).toEqual('ok');
    expect(JSON.stringify(healthCheckResult.error)).toBe('{}');
    expect(healthCheckResult.details?.http.status).toEqual('up');
    expect(healthCheckResult.details?.database.status).toEqual('up');
  });

  it('should return unhealthy status for http problems', async () => {
    const checkSpy = jest.spyOn(healthCheckService, 'check').mockResolvedValue({
      status: 'error',
      info: {
        database: {
          status: 'up',
        },
      },
      error: {
        http: {
          status: 'down',
          message: 'An error message',
        },
      },
      details: {
        http: {
          status: 'down',
          message: 'An error message',
        },
        database: {
          status: 'up',
        },
      },
    });

    const healthCheckResult = await healthService.healthCheck();

    expect(checkSpy).toHaveBeenCalledTimes(1);

    expect(healthCheckResult.status).toEqual('error');
    expect(healthCheckResult.error?.http.status).toEqual('down');
    expect(healthCheckResult.error?.http.message).toEqual('An error message');
    expect(healthCheckResult.details?.http.status).toEqual('down');
    expect(healthCheckResult.details?.http.message).toEqual('An error message');
    expect(healthCheckResult.details?.database.status).toEqual('up');
  });

  it('should return unhealthy status for database problems', async () => {
    const checkSpy = jest.spyOn(healthCheckService, 'check').mockResolvedValue({
      status: 'error',
      info: {
        http: {
          status: 'up',
        },
      },
      error: {
        database: {
          status: 'down',
          message: 'An error message',
        },
      },
      details: {
        http: {
          status: 'up',
        },
        database: {
          status: 'down',
          message: 'An error message',
        },
      },
    });

    const healthCheckResult = await healthService.healthCheck();

    expect(checkSpy).toHaveBeenCalledTimes(1);

    expect(healthCheckResult.status).toEqual('error');
    expect(healthCheckResult.error?.database.status).toEqual('down');
    expect(healthCheckResult.error?.database.message).toEqual('An error message');
    expect(healthCheckResult.details?.http.status).toEqual('up');
    expect(healthCheckResult.details?.database.status).toEqual('down');
    expect(healthCheckResult.details?.database.message).toEqual('An error message');
  });
});
