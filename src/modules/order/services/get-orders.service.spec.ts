import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma/prisma.service';
import { GetOrdersService } from './get-orders.service';
import { prismaMock } from '@common/mocks/prisma.mock';

describe('GetOrdersService', () => {
  let getOrdersService: GetOrdersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOrdersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    getOrdersService = module.get<GetOrdersService>(GetOrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getOrdersService).toBeDefined();
  });
});
