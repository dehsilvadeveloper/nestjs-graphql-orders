import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { DeleteOrderService } from './delete-order.service';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderCannotBeDeletedError } from '../errors/order-cannot-be-deleted.error';
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

describe('DeleteOrderService', () => {
  let deleteOrderService: DeleteOrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteOrderService,
        {
          provide: PrismaService,
          useValue: database,
        },
      ],
    }).compile();

    deleteOrderService = module.get<DeleteOrderService>(DeleteOrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(deleteOrderService).toBeDefined();
  });

  it('should delete order', async () => {
    const originalOrder = ordersFixture[0];
    const findFirstSpy = jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    const updateSpy = jest.spyOn(prismaService.order, 'update').mockResolvedValue({
      ...originalOrder,
      ...{
        deletedAt: new Date(),
      },
    });

    const deletedOrder = await deleteOrderService.delete(originalOrder.id);

    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toBeCalledWith({
      where: { id: originalOrder.id },
    });
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toBeCalledWith({
      where: { id: originalOrder.id },
      data: {
        deletedAt: expect.any(Date),
      },
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
    });

    expect(deletedOrder).toBeInstanceOf(OrderEntity);
    expect(deletedOrder.deletedAt).toEqual(expect.any(Date));
  });

  it('should throw error if order does not exists', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(null);

    await expect(deleteOrderService.delete(999)).rejects.toThrow(OrderNotFoundError);
  });

  it('should throw error if order is already deleted', async () => {
    const originalOrder = ordersFixture[1];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);

    await expect(deleteOrderService.delete(originalOrder.id)).rejects.toThrow(OrderIsDeletedError);
  });

  it('should throw error if the order is not pending', async () => {
    const originalOrder = ordersFixture[3];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);

    await expect(deleteOrderService.delete(originalOrder.id)).rejects.toThrow(OrderCannotBeDeletedError);
  });

  it('should throw error if the record could not be updated', async () => {
    const originalOrder = ordersFixture[0];
    const prismaErrorMock = new Prisma.PrismaClientKnownRequestError('Error message', {
      clientVersion: '5.1.1',
      code: PrismaErrorEnum.recordsRequiredForOperationNotFound,
      meta: { cause: 'Record to update not found.' }
    });

    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(prismaErrorMock);

    await expect(deleteOrderService.delete(originalOrder.id)).rejects.toThrow(OrderNotFoundError);
  });

  it('should throw error on unexpected prisma error', async () => {
    const originalOrder = ordersFixture[0];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(new Error('Unexpected database error.'));

    await expect(deleteOrderService.delete(originalOrder.id)).rejects.toThrow('Unexpected database error.');
  });
});
