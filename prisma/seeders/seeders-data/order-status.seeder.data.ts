import { OrderStatusEnum } from '../../../src/common/enums/order-status.enum';

export const orderStatusSeederData = [
  { id: OrderStatusEnum.pending, name: 'pending' },
  { id: OrderStatusEnum.paid, name: 'paid' },
  { id: OrderStatusEnum.canceled, name: 'canceled' },
  { id: OrderStatusEnum.refunded, name: 'refunded' },
  // Add more seed data as needed
];
