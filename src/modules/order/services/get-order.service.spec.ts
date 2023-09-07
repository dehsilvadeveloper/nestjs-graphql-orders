import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma/prisma.service';
import { GetOrderService } from './get-order.service';
import { OrderOriginEnum } from '@common/enums/order-origin.enum';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PaymentTypeEnum } from '@common/enums/payment-type.enum';
import { OrderEntity } from '../entities/order.entity';
import { ordersFixture } from '../fixtures/order.fixture';

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

describe('GetOrderService', () => {
  let getOrderService: GetOrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOrderService,
        {
          provide: PrismaService,
          useValue: database,
        },
      ],
    }).compile();

    getOrderService = module.get<GetOrderService>(GetOrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getOrderService).toBeDefined();
  });

  it('should get order', async () => {
    const originalOrder = ordersFixture[3];
    const findFirstSpy = jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);

    const order = await getOrderService.findById(originalOrder.id);

    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toBeCalledWith({
      where: { id: originalOrder.id },
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
    });

    expect(order).toBeInstanceOf(OrderEntity);
    expect(order?.total).toEqual(100);
    expect(order?.freightValue).toEqual(10);
    expect(order?.discount).toEqual(5);
    expect(order?.origin).toEqual(OrderOriginEnum.mobile);
    expect(order?.paymentType.id).toEqual(PaymentTypeEnum.boleto);
    expect(order?.orderStatus.id).toEqual(OrderStatusEnum.paid);
    expect(order?.store.id).toEqual(2);
    expect(order?.createdAt).toEqual(expect.any(Date));
    expect(order?.updatedAt).toEqual(expect.any(Date));
    expect(order?.paidAt).toEqual(expect.any(Date));
    expect(order?.canceledAt).toBeNull();
    expect(order?.refundedAt).toBeNull();
    expect(order?.deletedAt).toBeNull();
  });

  it('should return null if order does not exists', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(null);

    const order = await getOrderService.findById(999);

    expect(order).toBeNull();
  });
});
