import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateOrderService } from './create-order.service';
import { OrderOriginEnum } from '@common/enums/order-origin.enum';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PaymentTypeEnum } from '@common/enums/payment-type.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { CreateOrderDto } from '../dtos/create-order.dto';
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

describe('CreateOrderService', () => {
  let createOrderService: CreateOrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderService,
        {
          provide: PrismaService,
          useValue: database,
        },
      ],
    }).compile();

    createOrderService = module.get<CreateOrderService>(CreateOrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createOrderService).toBeDefined();
  });

  it('should create order', async () => {
    const createOrderDto = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    } as CreateOrderDto;

    const createSpy = jest.spyOn(prismaService.order, 'create').mockResolvedValue(ordersFixture[5]);

    const createdOrder = await createOrderService.create(createOrderDto);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toBeCalledWith({
      data: {
        orderStatusId: OrderStatusEnum.pending,
        ...createOrderDto,
      },
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
    });

    expect(createdOrder).toBeInstanceOf(OrderEntity);
    expect(createdOrder.total).toEqual(222.1);
    expect(createdOrder.freightValue).toEqual(4.57);
    expect(createdOrder.discount).toEqual(3);
    expect(createdOrder.origin).toEqual(OrderOriginEnum.web);
    expect(createdOrder.paymentType.id).toEqual(PaymentTypeEnum.pix);
    expect(createdOrder.orderStatus.id).toEqual(OrderStatusEnum.pending);
    expect(createdOrder.store.id).toEqual(1);
  });

  it('should throw error on unexpected prisma error', async () => {
    const createOrderDto = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    } as CreateOrderDto;

    jest.spyOn(prismaService.order, 'create').mockRejectedValue(new Error('Unexpected database error.'));

    await expect(createOrderService.create(createOrderDto)).rejects.toThrow('Unexpected database error.');
  });
});
