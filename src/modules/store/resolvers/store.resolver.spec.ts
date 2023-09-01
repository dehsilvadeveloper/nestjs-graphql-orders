import { Test, TestingModule } from '@nestjs/testing';
import { StoreResolver } from './store.resolver';
import { StoreService } from '../services/store.service';
import { PrismaService } from '@database/prisma/prisma.service';

jest.mock('@database/prisma/prisma.service');

describe('StoreResolver', () => {
  let storeResolver: StoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, StoreResolver, StoreService],
    }).compile();

    storeResolver = module.get<StoreResolver>(StoreResolver);
  });

  it('should be defined', () => {
    expect(storeResolver).toBeDefined();
  });
});
