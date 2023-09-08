import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateStoreDto } from './update-store.dto';

describe('UpdateStoreDto', () => {
  it('should pass validation without data', async () => {
    const dto = new UpdateStoreDto();

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should pass validation', async () => {
    const receivedData = {
      name: 'Store A1',
      ecommerceUrl: 'http://store.a1.test.com',
    };
    const dto = plainToInstance(UpdateStoreDto, receivedData);

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation using name that is not a string', async () => {
    const receivedData = {
      name: 3,
      ecommerceUrl: 'http://store.a1.test.com',
    };
    const dto = plainToInstance(UpdateStoreDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('name must be a string');
  });

  it('should fail validation using name with less than 3 characters', async () => {
    const receivedData = {
      name: 'a',
      ecommerceUrl: 'http://store.a1.test.com',
    };
    const dto = plainToInstance(UpdateStoreDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('name must be longer than or equal to 5 characters');
  });

  it('should fail validation using name with more than 100 characters', async () => {
    const receivedData = {
      name: 'x'.repeat(150),
      ecommerceUrl: 'http://store.a1.test.com',
    };
    const dto = plainToInstance(UpdateStoreDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('name must be shorter than or equal to 100 characters');
  });

  it('should fail validation using ecommerceUrl that is not a url', async () => {
    const receivedData = {
      name: 'Store A1',
      ecommerceUrl: 'abc',
    };
    const dto = plainToInstance(UpdateStoreDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('ecommerceUrl must be a URL address');
  });

  it('should fail validation using ecommerceUrl with more than 80 characters', async () => {
    const receivedData = {
      name: 'Store A1',
      ecommerceUrl: `http://store.a1${'k'.repeat(70)}.test.com`,
    };
    const dto = plainToInstance(UpdateStoreDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('ecommerceUrl must be shorter than or equal to 80 characters');
  });
});
