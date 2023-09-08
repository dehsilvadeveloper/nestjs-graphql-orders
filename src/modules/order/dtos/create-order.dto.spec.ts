import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateOrderDto } from './create-order.dto';
import { OrderOriginEnum } from '@common/enums/order-origin.enum';
import { PaymentTypeEnum } from '@common/enums/payment-type.enum';

describe('CreateOrderDto', () => {
  it('should pass validation', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation without total', async () => {
    const receivedData = {
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('total should not be empty');
  });

  it('should fail validation using total that is not a number', async () => {
    const receivedData = {
      total: 'abc',
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('total must be a number');
  });

  it('should fail validation without freightValue', async () => {
    const receivedData = {
      total: 222.1,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.boleto,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('freightValue should not be empty');
  });

  it('should fail validation using freightValue that is not a number', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 'abc',
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.boleto,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('freightValue must be a number');
  });

  it('should fail validation without discount', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      origin: OrderOriginEnum.mobile,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('discount should not be empty');
  });

  it('should fail validation using discount that is not a number', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 'xpt',
      origin: OrderOriginEnum.mobile,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('discount must be a number');
  });

  it('should fail validation without origin', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      paymentTypeId: PaymentTypeEnum.paypal,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('origin should not be empty');
  });

  it('should fail validation using origin that is not valid', async () => {
    const orderOriginValues = Object.values(OrderOriginEnum);
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: 'random',
      paymentTypeId: PaymentTypeEnum.paypal,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain(`origin must be one of the following values: ${orderOriginValues.join(', ')}`);
  });

  it('should fail validation without paymentTypeId', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('paymentTypeId should not be empty');
  });

  it('should fail validation using paymentTypeId that is not a number', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: 'transfer',
      storeId: 1,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('paymentTypeId must be a number');
  });

  it('should fail validation without storeId', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.creditcard,
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('storeId should not be empty');
  });

  it('should fail validation using storeId that is not a number', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.creditcard,
      storeId: 'rta',
    };
    const dto = plainToInstance(CreateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('storeId must be a number');
  });
});
