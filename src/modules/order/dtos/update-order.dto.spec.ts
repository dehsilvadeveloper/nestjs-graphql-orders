import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateOrderDto } from './update-order.dto';
import { OrderOriginEnum } from '@common/enums/order-origin.enum';
import { PaymentTypeEnum } from '@common/enums/payment-type.enum';

describe('UpdateOrderDto', () => {
  it('should pass validation without data', async () => {
    const dto = new UpdateOrderDto();

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should pass validation', async () => {
    const receivedData = {
      total: 222.1,
      freightValue: 4.57,
      discount: 3,
      origin: OrderOriginEnum.web,
      paymentTypeId: PaymentTypeEnum.pix,
      storeId: 1,
    };
    const dto = plainToInstance(UpdateOrderDto, receivedData);

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
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
    const dto = plainToInstance(UpdateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('total must be a number');
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
    const dto = plainToInstance(UpdateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('freightValue must be a number');
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
    const dto = plainToInstance(UpdateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('discount must be a number');
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
    const dto = plainToInstance(UpdateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain(`origin must be one of the following values: ${orderOriginValues.join(', ')}`);
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
    const dto = plainToInstance(UpdateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('paymentTypeId must be a number');
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
    const dto = plainToInstance(UpdateOrderDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('storeId must be a number');
  });
});
