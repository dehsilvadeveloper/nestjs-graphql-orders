import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from './order.resolver';
import { CancelOrderService } from '../services/cancel-order.service';
import { CreateOrderService } from '../services/create-order.service';
import { DeleteOrderService } from '../services/delete-order.service';
import { GetOrderService } from '../services/get-order.service';
import { GetOrdersService } from '../services/get-orders.service';
import { RefundOrderService } from '../services/refund-order.service';
import { UpdateOrderService } from '../services/update-order.service';
import { PrismaService } from '@database/prisma/prisma.service';

jest.mock('@database/prisma/prisma.service');

describe('OrderResolver', () => {
  let orderResolver: OrderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CancelOrderService,
        CreateOrderService,
        DeleteOrderService,
        GetOrderService,
        GetOrdersService,
        RefundOrderService,
        UpdateOrderService,
        OrderResolver,
      ],
    }).compile();

    orderResolver = module.get<OrderResolver>(OrderResolver);
  });

  it('should be defined', () => {
    expect(orderResolver).toBeDefined();
  });
});
