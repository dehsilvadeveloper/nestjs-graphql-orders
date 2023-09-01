import { Test, TestingModule } from '@nestjs/testing';
import { StoreResolver } from './store.resolver';
import { CreateStoreService } from '../services/create-store.service';
import { DeleteStoreService } from '../services/delete-store.service';
import { GetStoreService } from '../services/get-store.service';
import { UpdateStoreService } from '../services/update-store.service';
import { PrismaService } from '@database/prisma/prisma.service';

jest.mock('@database/prisma/prisma.service');

describe('StoreResolver', () => {
  let storeResolver: StoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CreateStoreService,
        DeleteStoreService,
        GetStoreService,
        UpdateStoreService,
        StoreResolver,
      ],
    }).compile();

    storeResolver = module.get<StoreResolver>(StoreResolver);
  });

  it('should be defined', () => {
    expect(storeResolver).toBeDefined();
  });
});
