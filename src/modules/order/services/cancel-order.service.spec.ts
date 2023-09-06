import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { CancelOrderService } from './cancel-order.service';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderIsCanceledError } from '../errors/order-is-canceled.error';
import { OrderCannotBeCanceledError } from '../errors/order-cannot-be-canceled.error';
import { ordersFixture } from '../fixtures/order.fixture';
import { orderStatusesFixture } from '../fixtures/order-status.fixture';

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

describe('CancelOrderService', () => {
  let cancelOrderService: CancelOrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CancelOrderService,
        {
          provide: PrismaService,
          useValue: database,
        },
      ],
    }).compile();

    cancelOrderService = module.get<CancelOrderService>(CancelOrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(cancelOrderService).toBeDefined();
  });

  it('should cancel order', async () => {
    const originalOrder = ordersFixture[0];
    const findFirstSpy = jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    const updateSpy = jest.spyOn(prismaService.order, 'update').mockResolvedValue({
      ...originalOrder,
      ...{
        canceledAt: new Date(),
        orderStatusId: OrderStatusEnum.canceled,
        orderStatus: orderStatusesFixture[2],
      },
    });

    const canceledOrder = await cancelOrderService.cancel(originalOrder.id);

    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toBeCalledWith({
      where: { id: originalOrder.id },
    });
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toBeCalledWith({
      where: { id: originalOrder.id },
      data: {
        canceledAt: expect.any(Date),
        orderStatusId: OrderStatusEnum.canceled,
      },
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
    });

    expect(canceledOrder).toBeInstanceOf(OrderEntity);
    expect(canceledOrder.canceledAt).toEqual(expect.any(Date));
    expect(canceledOrder.orderStatus.id).toBe(OrderStatusEnum.canceled);
  });

  it('should throw error if order does not exists', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(null);

    await expect(cancelOrderService.cancel(999)).rejects.toThrow(OrderNotFoundError);
  });

  it('should throw an error if order is deleted', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersFixture[1]);

    await expect(cancelOrderService.cancel(ordersFixture[1].id)).rejects.toThrow(OrderIsDeletedError);
  });

  it('should throw an error if order was already canceled', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersFixture[2]);

    await expect(cancelOrderService.cancel(ordersFixture[2].id)).rejects.toThrow(OrderIsCanceledError);
  });

  it('should throw an error if the order is not pending', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersFixture[3]);

    await expect(cancelOrderService.cancel(ordersFixture[3].id)).rejects.toThrow(OrderCannotBeCanceledError);
  });

  it('should throw error if the record could not be updated', async () => {
    const prismaErrorMock = new Prisma.PrismaClientKnownRequestError('Error message', {
      clientVersion: '5.1.1',
      code: PrismaErrorEnum.recordsRequiredForOperationNotFound,
      meta: { cause: 'Record to update not found.' }
    });

    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersFixture[0]);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(prismaErrorMock);

    await expect(cancelOrderService.cancel(ordersFixture[0].id)).rejects.toThrow(OrderNotFoundError);
  });

  it('should throw an error on unexpected prisma error', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersFixture[0]);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(new Error('Unexpected database error.'));

    await expect(cancelOrderService.cancel(ordersFixture[0].id)).rejects.toThrow('Unexpected database error.');
  });
});
