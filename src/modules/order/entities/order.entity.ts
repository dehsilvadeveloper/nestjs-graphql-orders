import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrderOriginEnum } from '@shared/enums/order-origin.enum';
import { OrderStatusEntity } from './order-status.entity';
import { PaymentTypeEntity } from './payment-type.entity';

registerEnumType(OrderOriginEnum, {
  name: 'OrderOriginEnum',
  description: 'Origin of the order. Example: web.'
});

@ObjectType()
export class OrderEntity {
  @Field(type => Int)
  id: number;

  @Field(type => Int, { description: 'Total value of order.' })
  total: number;

  @Field(type => Int, { description: 'Freight value for the order.' })
  freightValue: number;

  @Field(type => Int, { description: 'Discount value for the order.' })
  discount: number;

  @Field(type => OrderOriginEnum)
  origin: OrderOriginEnum;

  @Field(type => Date, { description: 'Date of creation of the order.' })
  createdAt: Date;

  @Field(type => Date, { description: 'Date of the last update of the order.' })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: 'Date when the order was paid.' })
  paidAt: Date;

  @Field(type => Date, { nullable: true, description: 'Date of removal of the order.' })
  deletedAt: Date;

  @Field(type => PaymentTypeEntity)
  paymentType: PaymentTypeEntity;

  @Field(type => OrderStatusEntity)
  orderStatus: OrderStatusEntity;
}
