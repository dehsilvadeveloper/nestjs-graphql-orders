import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from './order.resolver';
import { OrderService } from '../services/order.service';
import { PrismaService } from '@database/prisma/prisma.service';

jest.mock('@database/prisma/prisma.service');

describe('OrderResolver', () => {
  let orderResolver: OrderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, OrderResolver, OrderService],
    }).compile();

    orderResolver = module.get<OrderResolver>(OrderResolver);
  });

  it('should be defined', () => {
    expect(orderResolver).toBeDefined();
  });
});
