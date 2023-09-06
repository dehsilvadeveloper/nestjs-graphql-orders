import { OrderOriginEnum } from '@common/enums/order-origin.enum';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { paymentTypesFixture } from './payment-type.fixture';
import { orderStatusesFixture } from './order-status.fixture';
import { storesFixture } from '@modules/store/fixtures/store.fixture';

export const ordersFixture = [
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
    paymentType: paymentTypesFixture[1],
    orderStatus: orderStatusesFixture[0],
    store: storesFixture[1],
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
    paymentType: paymentTypesFixture[2],
    orderStatus: orderStatusesFixture[0],
    store: storesFixture[0],
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
    paymentType: paymentTypesFixture[3],
    orderStatus: orderStatusesFixture[2],
    store: storesFixture[0],
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
    paymentType: paymentTypesFixture[0],
    orderStatus: orderStatusesFixture[1],
    store: storesFixture[1],
  },
  {
    id: 5,
    total: 100,
    freightValue: 10,
    discount: 5,
    origin: OrderOriginEnum.web,
    createdAt: new Date(),
    updatedAt: new Date(),
    paidAt: null,
    canceledAt: null,
    refundedAt: new Date(),
    deletedAt: null,
    paymentTypeId: 1,
    orderStatusId: OrderStatusEnum.refunded,
    storeId: 1,
    paymentType: paymentTypesFixture[1],
    orderStatus: orderStatusesFixture[3],
    store: storesFixture[1],
  },
];
