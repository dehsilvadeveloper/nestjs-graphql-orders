import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { UpdateOrderService } from './update-order.service';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderUpdateWithoutDataError } from '../errors/order-update-without-data.error';
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

describe('UpdateOrderService', () => {
  let updateOrderService: UpdateOrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateOrderService,
        {
          provide: PrismaService,
          useValue: database,
        },
      ],
    }).compile();

    updateOrderService = module.get<UpdateOrderService>(UpdateOrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(updateOrderService).toBeDefined();
  });

  it('should update order', async () => {
    const originalOrder = ordersFixture[0];
    const findFirstSpy = jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    const updateSpy = jest.spyOn(prismaService.order, 'update').mockResolvedValue({
      ...originalOrder,
      ...{
        freightValue: 33.25,
        discount: 0,
      },
    });

    const updateOrderDto = {
      freightValue: 33.25,
      discount: 0,
    } as UpdateOrderDto;

    const updatedOrder = await updateOrderService.update(originalOrder.id, updateOrderDto);

    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toBeCalledWith({
      where: { id: originalOrder.id },
    });
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toBeCalledWith({
      where: { id: originalOrder.id },
      data: updateOrderDto,
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
    });

    expect(updatedOrder).toBeInstanceOf(OrderEntity);
    expect(updatedOrder.freightValue).toEqual(33.25);
    expect(updatedOrder.discount).toEqual(0);
  });

  it('should throw error if dto is empty', async () => {
    const originalOrder = ordersFixture[0];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);

    const updateOrderDto = {} as UpdateOrderDto;

    await expect(updateOrderService.update(originalOrder.id, updateOrderDto)).rejects.toThrow(
      OrderUpdateWithoutDataError,
    );
  });

  it('should throw error if order does not exists', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(null);

    const updateOrderDto = {
      freightValue: 33.25,
      discount: 0,
    } as UpdateOrderDto;

    await expect(updateOrderService.update(999, updateOrderDto)).rejects.toThrow(OrderNotFoundError);
  });

  it('should throw error if order is deleted', async () => {
    const originalOrder = ordersFixture[1];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);

    const updateOrderDto = {
      freightValue: 33.25,
      discount: 0,
    } as UpdateOrderDto;

    await expect(updateOrderService.update(originalOrder.id, updateOrderDto)).rejects.toThrow(OrderIsDeletedError);
  });

  it('should throw error if the record could not be updated', async () => {
    const originalOrder = ordersFixture[0];
    const prismaErrorMock = new Prisma.PrismaClientKnownRequestError('Error message', {
      clientVersion: '5.1.1',
      code: PrismaErrorEnum.recordsRequiredForOperationNotFound,
      meta: { cause: 'Record to update not found.' },
    });

    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(prismaErrorMock);

    const updateOrderDto = {
      freightValue: 33.25,
      discount: 0,
    } as UpdateOrderDto;

    await expect(updateOrderService.update(originalOrder.id, updateOrderDto)).rejects.toThrow(OrderNotFoundError);
  });

  it('should throw error on unexpected prisma error', async () => {
    const originalOrder = ordersFixture[0];
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(originalOrder);
    jest.spyOn(prismaService.order, 'update').mockRejectedValue(new Error('Unexpected database error.'));

    const updateOrderDto = {
      freightValue: 33.25,
      discount: 0,
    } as UpdateOrderDto;

    await expect(updateOrderService.update(originalOrder.id, updateOrderDto)).rejects.toThrow(
      'Unexpected database error.',
    );
  });
});
