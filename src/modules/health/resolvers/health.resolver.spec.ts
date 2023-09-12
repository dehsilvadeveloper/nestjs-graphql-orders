import { Test, TestingModule } from '@nestjs/testing';
import { HealthResolver } from './health.resolver';
import { HealthService } from '../services/health.service';
import { PrismaService } from '@database/prisma/prisma.service';

jest.mock('@database/prisma/prisma.service');

describe('HealthResolver', () => {
  let healthResolver: HealthResolver;
  let healthService: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: HealthService,
          useValue: {
            healthCheck: jest.fn(),
          },
        },
        HealthResolver,
      ],
    }).compile();

    healthResolver = module.get<HealthResolver>(HealthResolver);
    healthService = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(healthResolver).toBeDefined();
  });

  it('should call service to return health check', async () => {
    const healthCheckSpy = jest.spyOn(healthService, 'healthCheck').mockResolvedValue({
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

    const healthCheckResult = await healthResolver.health();

    expect(healthCheckSpy).toHaveBeenCalledTimes(1);

    expect(healthCheckResult.status).toEqual('ok');
  });
});
