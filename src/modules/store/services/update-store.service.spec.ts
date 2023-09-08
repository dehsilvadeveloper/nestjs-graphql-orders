import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { UpdateStoreService } from './update-store.service';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { UpdateStoreDto } from '../dtos/update-store.dto';
import { StoreEntity } from '../entities/store.entity';
import { StoreIsDeletedError } from '../errors/store-is-deleted.error';
import { StoreNotFoundError } from '../errors/store-not-found.error';
import { StoreUpdateWithoutDataError } from '../errors/store-update-without-data.error';
import { prismaMock } from '@common/mocks/prisma.mock';
import { storesFixture } from '../fixtures/store.fixture';

describe('UpdateStoreService', () => {
  let updateStoreService: UpdateStoreService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateStoreService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    updateStoreService = module.get<UpdateStoreService>(UpdateStoreService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(updateStoreService).toBeDefined();
  });

  it('should update store', async () => {
    const originalStore = storesFixture[0];
    const findFirstSpy = jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);
    const updateSpy = jest.spyOn(prismaService.store, 'update').mockResolvedValue({
      ...originalStore,
      ...{
        name: 'Max Store X2',
        ecommerceUrl: 'http://max-store.x2.test.com',
      },
    });

    const updateStoreDto = {
      name: 'Max Store X2',
      ecommerceUrl: 'http://max-store.x2.test.com',
    } as UpdateStoreDto;

    const updatedStore = await updateStoreService.update(originalStore.id, updateStoreDto);

    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toBeCalledWith({
      where: { id: originalStore.id },
    });
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toBeCalledWith({
      where: { id: originalStore.id },
      data: updateStoreDto,
    });

    expect(updatedStore).toBeInstanceOf(StoreEntity);
    expect(updatedStore.name).toEqual('Max Store X2');
    expect(updatedStore.ecommerceUrl).toEqual('http://max-store.x2.test.com');
  });

  it('should throw error if dto is empty', async () => {
    const originalStore = storesFixture[0];
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);

    const updateStoreDto = {} as UpdateStoreDto;

    await expect(updateStoreService.update(originalStore.id, updateStoreDto)).rejects.toThrow(
      StoreUpdateWithoutDataError,
    );
  });

  it('should throw error if store does not exists', async () => {
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(null);

    const updateStoreDto = {
      name: 'Max Store X2',
      ecommerceUrl: 'http://max-store.x2.test.com',
    } as UpdateStoreDto;

    await expect(updateStoreService.update(999, updateStoreDto)).rejects.toThrow(StoreNotFoundError);
  });

  it('should throw error if store is deleted', async () => {
    const originalStore = storesFixture[2];
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);

    const updateStoreDto = {
      name: 'Max Store X2',
      ecommerceUrl: 'http://max-store.x2.test.com',
    } as UpdateStoreDto;

    await expect(updateStoreService.update(originalStore.id, updateStoreDto)).rejects.toThrow(StoreIsDeletedError);
  });

  it('should throw error if the record could not be updated', async () => {
    const originalStore = storesFixture[0];
    const prismaErrorMock = new Prisma.PrismaClientKnownRequestError('Error message', {
      clientVersion: '5.1.1',
      code: PrismaErrorEnum.recordsRequiredForOperationNotFound,
      meta: { cause: 'Record to update not found.' },
    });

    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);
    jest.spyOn(prismaService.store, 'update').mockRejectedValue(prismaErrorMock);

    const updateStoreDto = {
      name: 'Max Store X2',
      ecommerceUrl: 'http://max-store.x2.test.com',
    } as UpdateStoreDto;

    await expect(updateStoreService.update(originalStore.id, updateStoreDto)).rejects.toThrow(StoreNotFoundError);
  });

  it('should throw error on unexpected prisma error', async () => {
    const originalStore = storesFixture[0];
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(originalStore);
    jest.spyOn(prismaService.store, 'update').mockRejectedValue(new Error('Unexpected database error.'));

    const updateStoreDto = {
      name: 'Max Store X2',
      ecommerceUrl: 'http://max-store.x2.test.com',
    } as UpdateStoreDto;

    await expect(updateStoreService.update(originalStore.id, updateStoreDto)).rejects.toThrow(
      'Unexpected database error.',
    );
  });
});
