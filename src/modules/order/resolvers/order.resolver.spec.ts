import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { OrderResolver } from './order.resolver';
import { CancelOrderService } from '../services/cancel-order.service';
import { CreateOrderService } from '../services/create-order.service';
import { DeleteOrderService } from '../services/delete-order.service';
import { GetOrderService } from '../services/get-order.service';
import { GetOrdersService } from '../services/get-orders.service';
import { RefundOrderService } from '../services/refund-order.service';
import { UpdateOrderService } from '../services/update-order.service';
import { PrismaService } from '@database/prisma/prisma.service';
import { OrderOriginEnum } from '@common/enums/order-origin.enum';
import { PaymentTypeEnum } from '@common/enums/payment-type.enum';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { ordersFixture } from '../fixtures/order.fixture';
import { cancelOrderServiceMock } from '../mocks/cancel-order.service.mock';
import { createOrderServiceMock } from '../mocks/create-order.service.mock';
import { updateOrderServiceMock } from '../mocks/update-order.service.mock';
import { deleteOrderServiceMock } from '../mocks/delete-order.service.mock';
import { getOrderServiceMock } from '../mocks/get-order.service.mock';
import { getOrdersServiceMock } from '../mocks/get-orders.service.mock';
import { refundOrderServiceMock } from '../mocks/refund-order.service.mock';

jest.mock('@database/prisma/prisma.service');

describe('OrderResolver', () => {
  let orderResolver: OrderResolver;
  let cancelOrderService: CancelOrderService;
  let createOrderService: CreateOrderService;
  let deleteOrderService: DeleteOrderService;
  let getOrderService: GetOrderService;
  let getOrdersService: GetOrdersService;
  let refundOrderService: RefundOrderService;
  let updateOrderService: UpdateOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: CancelOrderService,
          useValue: cancelOrderServiceMock,
        },
        {
          provide: CreateOrderService,
          useValue: createOrderServiceMock,
        },
        {
          provide: DeleteOrderService,
          useValue: deleteOrderServiceMock,
        },
        {
          provide: GetOrderService,
          useValue: getOrderServiceMock,
        },
        {
          provide: GetOrdersService,
          useValue: getOrdersServiceMock,
        },
        {
          provide: RefundOrderService,
          useValue: refundOrderServiceMock,
        },
        {
          provide: UpdateOrderService,
          useValue: updateOrderServiceMock,
        },
        OrderResolver,
      ],
    }).compile();

    orderResolver = module.get<OrderResolver>(OrderResolver);
    cancelOrderService = module.get<CancelOrderService>(CancelOrderService);
    createOrderService = module.get<CreateOrderService>(CreateOrderService);
    deleteOrderService = module.get<DeleteOrderService>(DeleteOrderService);
    getOrderService = module.get<GetOrderService>(GetOrderService);
    getOrdersService = module.get<GetOrdersService>(GetOrdersService);
    refundOrderService = module.get<RefundOrderService>(RefundOrderService);
    updateOrderService = module.get<UpdateOrderService>(UpdateOrderService);
  });

  it('should be defined', () => {
    expect(orderResolver).toBeDefined();
  });

  it('should call service to create order', async () => {
    const createOrderDto = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    } as CreateOrderDto;

    const createSpy = jest.spyOn(createOrderService, 'create');

    await orderResolver.createOrder(createOrderDto);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toBeCalledWith({
      ...createOrderDto,
    });
  });

  it('should call service to update order', async () => {
    const updateOrderDto = {
      freightValue: 33.25,
      discount: 0,
    } as UpdateOrderDto;

    const updateSpy = jest.spyOn(updateOrderService, 'update');

    await orderResolver.updateOrder(1, updateOrderDto);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toBeCalledWith(1, {
      ...updateOrderDto,
    });
  });

  it('should call service to cancel order', async () => {
    const cancelSpy = jest.spyOn(cancelOrderService, 'cancel');

    await orderResolver.cancelOrder(1);

    expect(cancelSpy).toHaveBeenCalledTimes(1);
    expect(cancelSpy).toBeCalledWith(1);
  });

  it('should call service to refund order', async () => {
    const refundSpy = jest.spyOn(refundOrderService, 'refund');

    await orderResolver.refundOrder(1);

    expect(refundSpy).toHaveBeenCalledTimes(1);
    expect(refundSpy).toBeCalledWith(1);
  });

  it('should call service to delete order', async () => {
    const deleteSpy = jest.spyOn(deleteOrderService, 'delete');

    await orderResolver.deleteOrder(1);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(1);
  });

  it('should call service to get order by id', async () => {
    const order = plainToInstance(OrderEntity, ordersFixture[0]);
    const getByIdSpy = jest.spyOn(getOrderService, 'findById').mockResolvedValue(order);

    await orderResolver.getOrderById(1);

    expect(getByIdSpy).toHaveBeenCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(1);
  });
});
