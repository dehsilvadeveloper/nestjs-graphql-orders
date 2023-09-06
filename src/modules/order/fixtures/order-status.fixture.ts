import { OrderStatusEnum } from '@common/enums/order-status.enum';

export const orderStatusesFixture = [
  { id: OrderStatusEnum.pending, name: 'pending' },
  { id: OrderStatusEnum.paid, name: 'paid' },
  { id: OrderStatusEnum.canceled, name: 'canceled' },
  { id: OrderStatusEnum.refunded, name: 'refunded' },
];
