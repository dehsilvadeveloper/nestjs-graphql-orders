import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { StoreResolver } from './store.resolver';
import { CreateStoreService } from '../services/create-store.service';
import { DeleteStoreService } from '../services/delete-store.service';
import { GetStoreService } from '../services/get-store.service';
import { UpdateStoreService } from '../services/update-store.service';
import { PrismaService } from '@database/prisma/prisma.service';
import { StoreEntity } from '../entities/store.entity';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { UpdateStoreDto } from '../dtos/update-store.dto';
import { storesFixture } from '../fixtures/store.fixture';
import { createStoreServiceMock } from '../mocks/create-store.service.mock';
import { updateStoreServiceMock } from '../mocks/update-store.service.mock';
import { deleteStoreServiceMock } from '../mocks/delete-store.service.mock';
import { getStoreServiceMock } from '../mocks/get-store.service.mock';

jest.mock('@database/prisma/prisma.service');

describe('StoreResolver', () => {
  let storeResolver: StoreResolver;
  let createStoreService: CreateStoreService;
  let deleteStoreService: DeleteStoreService;
  let getStoreService: GetStoreService;
  let updateStoreService: UpdateStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: CreateStoreService,
          useValue: createStoreServiceMock,
        },
        {
          provide: DeleteStoreService,
          useValue: deleteStoreServiceMock,
        },
        {
          provide: GetStoreService,
          useValue: getStoreServiceMock,
        },
        {
          provide: UpdateStoreService,
          useValue: updateStoreServiceMock,
        },
        StoreResolver,
      ],
    }).compile();

    storeResolver = module.get<StoreResolver>(StoreResolver);
    createStoreService = module.get<CreateStoreService>(CreateStoreService);
    deleteStoreService = module.get<DeleteStoreService>(DeleteStoreService);
    getStoreService = module.get<GetStoreService>(GetStoreService);
    updateStoreService = module.get<UpdateStoreService>(UpdateStoreService);
  });

  it('should be defined', () => {
    expect(storeResolver).toBeDefined();
  });

  it('should call service to create store', async () => {
    const createStoreDto = {
      name: 'Store A1',
      ecommerceUrl: 'http://store.a1.test.com',
    } as CreateStoreDto;

    const createSpy = jest.spyOn(createStoreService, 'create');

    await storeResolver.createStore(createStoreDto);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toBeCalledWith({
      ...createStoreDto,
    });
  });

  it('should call service to update store', async () => {
    const updateStoreDto = {
      name: 'Max Store X2',
      ecommerceUrl: 'http://max-store.x2.test.com',
    } as UpdateStoreDto;

    const updateSpy = jest.spyOn(updateStoreService, 'update');

    await storeResolver.updateStore(1, updateStoreDto);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toBeCalledWith(1, {
      ...updateStoreDto,
    });
  });

  it('should call service to delete store', async () => {
    const deleteSpy = jest.spyOn(deleteStoreService, 'delete');

    await storeResolver.deleteStore(1);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(1);
  });

  it('should call service to get store by id', async () => {
    const store = plainToInstance(StoreEntity, storesFixture[0]);
    const getByIdSpy = jest.spyOn(getStoreService, 'findById').mockResolvedValue(store);

    await storeResolver.getStoreById(1);

    expect(getByIdSpy).toHaveBeenCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(1);
  });
});
