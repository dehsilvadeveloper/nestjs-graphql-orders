import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { CancelOrderService } from './cancel-order.service';
import { OrderOriginEnum } from '@common/enums/order-origin.enum';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PaymentTypeEnum } from '@common/enums/payment-type.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderIsCanceledError } from '../errors/order-is-canceled.error';
import { OrderCannotBeCanceledError } from '../errors/order-cannot-be-canceled.error';

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

const storesArray = [
  { id: 1, name: 'Store A1', ecommerceUrl: 'http://store.a1.test.com' },
  { id: 2, name: 'Store B2', ecommerceUrl: 'http://store.b2.test.com' },
];

const orderStatusesArray = [
  { id: OrderStatusEnum.pending, name: 'pending' },
  { id: OrderStatusEnum.paid, name: 'paid' },
  { id: OrderStatusEnum.canceled, name: 'canceled' },
  { id: OrderStatusEnum.refunded, name: 'refunded' },
];

const paymentTypesArray = [
  { id: PaymentTypeEnum.boleto, name: 'boleto' },
  { id: PaymentTypeEnum.creditcard, name: 'creditcard' },
  { id: PaymentTypeEnum.paypal, name: 'paypal' },
  { id: PaymentTypeEnum.pix, name: 'pix' },
];

const ordersArray = [
  {
    id: 1,
    total: 100,
    freightValue: 10,
    discount: 5,
    origin: OrderOriginEnum.web,
    createdAt: new Date(),
    updatedAt: new Date(),
    paidAt: null,
    canceledAt: null,
    refundedAt: null,
    deletedAt: null,
    paymentTypeId: 1,
    orderStatusId: OrderStatusEnum.pending,
    storeId: 1,
    paymentType: paymentTypesArray[1],
    orderStatus: orderStatusesArray[0],
    store: storesArray[1],
  },
  {
    id: 2,
    total: 100,
    freightValue: 10,
    discount: 5,
    origin: OrderOriginEnum.mobile,
    createdAt: new Date(),
    updatedAt: new Date(),
    paidAt: null,
    canceledAt: null,
    refundedAt: null,
    deletedAt: new Date(),
    paymentTypeId: 1,
    orderStatusId: OrderStatusEnum.pending,
    storeId: 1,
    paymentType: paymentTypesArray[2],
    orderStatus: orderStatusesArray[0],
    store: storesArray[0],
  },
  {
    id: 3,
    total: 100,
    freightValue: 10,
    discount: 5,
    origin: OrderOriginEnum.web,
    createdAt: new Date(),
    updatedAt: new Date(),
    paidAt: null,
    canceledAt: new Date(),
    refundedAt: null,
    deletedAt: null,
    paymentTypeId: 1,
    orderStatusId: OrderStatusEnum.canceled,
    storeId: 1,
    paymentType: paymentTypesArray[3],
    orderStatus: orderStatusesArray[2],
    store: storesArray[0],
  },
  {
    id: 4,
    total: 100,
    freightValue: 10,
    discount: 5,
    origin: OrderOriginEnum.mobile,
    createdAt: new Date(),
    updatedAt: new Date(),
    paidAt: new Date(),
    canceledAt: null,
    refundedAt: null,
    deletedAt: null,
    paymentTypeId: 1,
    orderStatusId: OrderStatusEnum.paid,
    storeId: 1,
    paymentType: paymentTypesArray[0],
    orderStatus: orderStatusesArray[1],
    store: storesArray[1],
  },
];

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
    const originalOrder = ordersArray[0];
    const findFirstSpy = jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    const updateSpy = jest.spyOn(prismaService.order, 'update').mockResolvedValue({
      ...originalOrder,
      ...{
        canceledAt: new Date(),
        orderStatusId: OrderStatusEnum.canceled,
        orderStatus: orderStatusesArray[2],
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
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersArray[1]);

    await expect(cancelOrderService.cancel(ordersArray[1].id)).rejects.toThrow(OrderIsDeletedError);
  });

  it('should throw an error if order was already canceled', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersArray[2]);

    await expect(cancelOrderService.cancel(ordersArray[2].id)).rejects.toThrow(OrderIsCanceledError);
  });

  it('should throw an error if the order is not pending', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersArray[3]);

    await expect(cancelOrderService.cancel(ordersArray[3].id)).rejects.toThrow(OrderCannotBeCanceledError);
  });

  it('should throw error if the record could not be updated', async () => {
    const prismaErrorMock = new Prisma.PrismaClientKnownRequestError('Error message', {
      clientVersion: '5.1.1',
      code: PrismaErrorEnum.recordsRequiredForOperationNotFound,
      meta: { cause: 'Record to update not found.' }
    });

    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(ordersArray[0]);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(prismaErrorMock);

    await expect(cancelOrderService.cancel(ordersArray[0].id)).rejects.toThrow(OrderNotFoundError);
  });
});
