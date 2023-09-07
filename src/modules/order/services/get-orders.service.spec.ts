import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma/prisma.service';
import { GetOrdersService } from './get-orders.service';

const database = {
  order: {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('GetOrdersService', () => {
  let getOrdersService: GetOrdersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOrdersService,
        {
          provide: PrismaService,
          useValue: database,
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
