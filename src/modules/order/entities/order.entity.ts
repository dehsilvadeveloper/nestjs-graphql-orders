import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@shared/entities/base.entity';
import { OrderStatusEntity } from './order-status.entity';
import { PaymentTypeEntity } from './payment-type.entity';
import { StoreEntity } from '@modules/store/entities/store.entity';

@ObjectType()
export class OrderEntity extends BaseEntity {
  @Field(() => Float, { description: 'Total value of order.' })
  total: number;

  @Field(() => Float, { description: 'Freight value for the order.' })
  freightValue: number;

  @Field(() => Float, { description: 'Discount value for the order.' })
  discount: number;

  @Field(() => String, { description: 'Origin of the order. Example: web.' })
  origin: String;

  @Field(() => Date, { nullable: true, description: 'Date when the order was paid.' })
  paidAt: Date | null;

  @Field(() => Date, { nullable: true, description: 'Date of removal of the order.' })
  deletedAt: Date | null;

  @Field(() => PaymentTypeEntity)
  paymentType: PaymentTypeEntity;

  @Field(() => OrderStatusEntity)
  orderStatus: OrderStatusEntity;

  @Field(() => StoreEntity)
  store: StoreEntity;
}
