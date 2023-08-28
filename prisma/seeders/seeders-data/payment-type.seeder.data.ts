import { PaymentTypeEnum } from '../../../src/common/enums/payment-type.enum';

export const paymentTypeSeederData = [
  { id: PaymentTypeEnum.boleto, name: 'boleto' },
  { id: PaymentTypeEnum.creditcard, name: 'creditcard' },
  { id: PaymentTypeEnum.paypal, name: 'paypal' },
  { id: PaymentTypeEnum.pix, name: 'pix' },
  // Add more seed data as needed
];
