import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { OrderOriginEnum } from '@common/enums/order-origin.enum';

@InputType({ description: 'Fields to create a new order.'})
export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Field({ description: 'Total value of order.' })
  total: number;

  @IsNotEmpty()
  @IsNumber()
  @Field({ description: 'Freight value for the order.' })
  freightValue: number;

  @IsNotEmpty()
  @IsNumber()
  @Field({ description: 'Discount value for the order.' })
  discount: number;

  @IsNotEmpty()
  @IsEnum(OrderOriginEnum)
  @Field({ description: 'Origin of the order. Example: web.' })
  origin: OrderOriginEnum;

  @IsNotEmpty()
  @IsNumber()
  @Field({ description: 'ID for the payment type of the order.' })
  paymentTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field({ description: 'ID for the store where the order was generated.' })
  storeId: number;
}