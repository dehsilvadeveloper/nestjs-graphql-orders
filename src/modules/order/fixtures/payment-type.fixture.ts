import { PaymentTypeEnum } from '@common/enums/payment-type.enum';

export const paymentTypesFixture = [
  { id: PaymentTypeEnum.boleto, name: 'boleto' },
  { id: PaymentTypeEnum.creditcard, name: 'creditcard' },
  { id: PaymentTypeEnum.paypal, name: 'paypal' },
  { id: PaymentTypeEnum.pix, name: 'pix' },
];
