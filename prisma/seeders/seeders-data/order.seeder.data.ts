import { OrderOriginEnum } from '../../../src/common/enums/order-origin.enum';
import { OrderStatusEnum } from '../../../src/common/enums/order-status.enum';
import { PaymentTypeEnum } from '../../../src/common/enums/payment-type.enum';

export const orderSeederData = [
  {
    total: 100.0,
    freightValue: 10.0,
    discount: 5.0,
    origin: OrderOriginEnum.web,
    paymentTypeId: PaymentTypeEnum.boleto,
    orderStatusId: OrderStatusEnum.pending,
    storeId: 1,
  },
  {
    total: 150.0,
    freightValue: 15.0,
    discount: 8.0,
    origin: OrderOriginEnum.mobile,
    paymentTypeId: PaymentTypeEnum.pix,
    orderStatusId: OrderStatusEnum.paid,
    storeId: 1,
    paidAt: new Date(),
  },
  // Add more seed data as needed
];
