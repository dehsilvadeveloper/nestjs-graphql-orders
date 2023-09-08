import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateStoreService } from './create-store.service';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { StoreEntity } from '../entities/store.entity';
import { prismaMock } from '@common/mocks/prisma.mock';
import { storesFixture } from '../fixtures/store.fixture';

describe('CreateStoreService', () => {
  let createStoreService: CreateStoreService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStoreService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    createStoreService = module.get<CreateStoreService>(CreateStoreService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createStoreService).toBeDefined();
  });

  it('should create order', async () => {
    const createStoreDto = {
      name: 'Store A1',
      ecommerceUrl: 'http://store.a1.test.com',
    } as CreateStoreDto;

    const createSpy = jest.spyOn(prismaService.store, 'create').mockResolvedValue(storesFixture[0]);

    const createdStore = await createStoreService.create(createStoreDto);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toBeCalledWith({
      data: createStoreDto,
    });

    expect(createdStore).toBeInstanceOf(StoreEntity);
    expect(createdStore.name).toEqual('Store A1');
    expect(createdStore.ecommerceUrl).toEqual('http://store.a1.test.com');
    expect(createdStore.createdAt).toEqual(expect.any(Date));
    expect(createdStore.updatedAt).toEqual(expect.any(Date));
    expect(createdStore.deletedAt).toBeNull();
  });

  it('should throw error on unexpected prisma error', async () => {
    const createStoreDto = {
      name: 'Store A1',
      ecommerceUrl: 'http://store.a1.test.com',
    } as CreateStoreDto;

    jest.spyOn(prismaService.store, 'create').mockRejectedValue(new Error('Unexpected database error.'));

    await expect(createStoreService.create(createStoreDto)).rejects.toThrow('Unexpected database error.');
  });
});
