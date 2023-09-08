import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { DeleteStoreService } from './delete-store.service';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { StoreEntity } from '../entities/store.entity';
import { StoreNotFoundError } from '../errors/store-not-found.error';
import { StoreIsDeletedError } from '../errors/store-is-deleted.error';
import { prismaMock } from '@common/mocks/prisma.mock';
import { storesFixture } from '../fixtures/store.fixture';

describe('DeleteStoreService', () => {
  let deleteStoreService: DeleteStoreService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteStoreService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    deleteStoreService = module.get<DeleteStoreService>(DeleteStoreService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(deleteStoreService).toBeDefined();
  });

  it('should delete store', async () => {
    const originalStore = storesFixture[1];
    const findFirstSpy = jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);
    const updateSpy = jest.spyOn(prismaService.store, 'update').mockResolvedValue({
      ...originalStore,
      ...{
        deletedAt: new Date(),
      },
    });

    const deletedStore = await deleteStoreService.delete(originalStore.id);

    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toBeCalledWith({
      where: { id: originalStore.id },
    });
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toBeCalledWith({
      where: { id: originalStore.id },
      data: {
        deletedAt: expect.any(Date),
      },
    });

    expect(deletedStore).toBeInstanceOf(StoreEntity);
    expect(deletedStore.deletedAt).toEqual(expect.any(Date));
  });

  it('should throw error if store does not exists', async () => {
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(null);

    await expect(deleteStoreService.delete(999)).rejects.toThrow(StoreNotFoundError);
  });

  it('should throw error if store is already deleted', async () => {
    const originalStore = storesFixture[2];
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);

    await expect(deleteStoreService.delete(originalStore.id)).rejects.toThrow(StoreIsDeletedError);
  });

  it('should throw error if the record could not be updated', async () => {
    const originalStore = storesFixture[0];
    const prismaErrorMock = new Prisma.PrismaClientKnownRequestError('Error message', {
      clientVersion: '5.1.1',
      code: PrismaErrorEnum.recordsRequiredForOperationNotFound,
      meta: { cause: 'Record to update not found.' }
    });

    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);
    jest.spyOn(prismaService.store, 'update').mockRejectedValue(prismaErrorMock);

    await expect(deleteStoreService.delete(originalStore.id)).rejects.toThrow(StoreNotFoundError);
  });

  it('should throw error on unexpected prisma error', async () => {
    const originalStore = storesFixture[0];
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);
    jest.spyOn(prismaService.store, 'update').mockRejectedValue(new Error('Unexpected database error.'));

    await expect(deleteStoreService.delete(originalStore.id)).rejects.toThrow('Unexpected database error.');
  });
});
