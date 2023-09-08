import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma/prisma.service';
import { GetStoreService } from './get-store.service';
import { StoreEntity } from '../entities/store.entity';
import { prismaMock } from '@common/mocks/prisma.mock';
import { storesFixture } from '../fixtures/store.fixture';

describe('GetStoreService', () => {
  let getStoreService: GetStoreService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStoreService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    getStoreService = module.get<GetStoreService>(GetStoreService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getStoreService).toBeDefined();
  });

  it('should get store', async () => {
    const originalStore = storesFixture[1];
    const findFirstSpy = jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);

    const store = await getStoreService.findById(originalStore.id);

    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toBeCalledWith({
      where: { id: originalStore.id },
    });

    expect(store).toBeInstanceOf(StoreEntity);
    expect(store?.name).toEqual('Store B2');
    expect(store?.ecommerceUrl).toEqual('http://store.b2.test.com');
    expect(store?.createdAt).toEqual(expect.any(Date));
    expect(store?.updatedAt).toEqual(expect.any(Date));
    expect(store?.deletedAt).toBeNull();
  });

  it('should return null if store does not exists', async () => {
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(null);

    const store = await getStoreService.findById(999);

    expect(store).toBeNull();
  });
});
