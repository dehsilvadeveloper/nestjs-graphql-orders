import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { RefundOrderService } from './refund-order.service';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderIsRefundedError } from '../errors/order-is-refunded.error';
import { OrderCannotBeRefundedError } from '../errors/order-cannot-be-refunded.error';
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

describe('RefundOrderService', () => {
  let refundOrderService: RefundOrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefundOrderService,
        {
          provide: PrismaService,
          useValue: database,
        },
      ],
    }).compile();

    refundOrderService = module.get<RefundOrderService>(RefundOrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(refundOrderService).toBeDefined();
  });

  it('should refund order', async () => {
    const originalOrder = ordersFixture[3];
    const findFirstSpy = jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    const updateSpy = jest.spyOn(prismaService.order, 'update').mockResolvedValue({
      ...originalOrder,
      ...{
        refundedAt: new Date(),
        orderStatusId: OrderStatusEnum.refunded,
        orderStatus: orderStatusesFixture[3],
      },
    });

    const refundedOrder = await refundOrderService.refund(originalOrder.id);

    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toBeCalledWith({
      where: { id: originalOrder.id },
    });
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toBeCalledWith({
      where: { id: originalOrder.id },
      data: {
        refundedAt: expect.any(Date),
        orderStatusId: OrderStatusEnum.refunded,
      },
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
    });

    expect(refundedOrder).toBeInstanceOf(OrderEntity);
    expect(refundedOrder.refundedAt).toEqual(expect.any(Date));
    expect(refundedOrder.orderStatus.id).toBe(OrderStatusEnum.refunded);
  });

  it('should throw error if order does not exists', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(null);

    await expect(refundOrderService.refund(999)).rejects.toThrow(OrderNotFoundError);
  });

  it('should throw error if order is deleted', async () => {
    const originalOrder = ordersFixture[1];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);

    await expect(refundOrderService.refund(originalOrder.id)).rejects.toThrow(OrderIsDeletedError);
  });

  it('should throw error if order was already refunded', async () => {
    const originalOrder = ordersFixture[4];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);

    await expect(refundOrderService.refund(originalOrder.id)).rejects.toThrow(OrderIsRefundedError);
  });

  it('should throw error if the order is not paid', async () => {
    const originalOrder = ordersFixture[0];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);

    await expect(refundOrderService.refund(originalOrder.id)).rejects.toThrow(OrderCannotBeRefundedError);
  });

  it('should throw error if the record could not be updated', async () => {
    const originalOrder = ordersFixture[3];
    const prismaErrorMock = new Prisma.PrismaClientKnownRequestError('Error message', {
      clientVersion: '5.1.1',
      code: PrismaErrorEnum.recordsRequiredForOperationNotFound,
      meta: { cause: 'Record to update not found.' }
    });

    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(prismaErrorMock);

    await expect(refundOrderService.refund(originalOrder.id)).rejects.toThrow(OrderNotFoundError);
  });

  it('should throw error on unexpected prisma error', async () => {
    const originalOrder = ordersFixture[3];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(new Error('Unexpected database error.'));

    await expect(refundOrderService.refund(originalOrder.id)).rejects.toThrow('Unexpected database error.');
  });
});
