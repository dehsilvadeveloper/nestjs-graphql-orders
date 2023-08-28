import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { OrderOriginEnum } from '@common/enums/order-origin.enum';

@InputType()
export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  freightValue: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  discount: number;

  @IsNotEmpty()
  @IsEnum(OrderOriginEnum)
  @Field()
  origin: OrderOriginEnum;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  paymentTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  orderStatusId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  storeId: number;
}