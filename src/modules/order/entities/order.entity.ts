import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';
import { BaseEntity } from '@common/entities/base.entity';
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

  @Field(() => String, { nullable: true, description: 'Date when the order was paid.' })
  @Transform(
    value => {
      const item = value.value;

      if (!item) {
        return null;
      }

      return format(item, 'dd/MM/yyyy HH:mm:ss');
    },
    { toPlainOnly: true },
  )
  paidAt: Date | null;

  @Field(() => String, { nullable: true, description: 'Date when the order was canceled.' })
  @Transform(
    value => {
      const item = value.value;

      if (!item) {
        return null;
      }

      return format(item, 'dd/MM/yyyy HH:mm:ss');
    },
    { toPlainOnly: true },
  )
  canceledAt: Date | null;

  @Field(() => Date, { nullable: true, description: 'Date of removal of the order.' })
  @Transform(
    value => {
      const item = value.value;

      if (!item) {
        return null;
      }

      return format(item, 'dd/MM/yyyy HH:mm:ss');
    },
    { toPlainOnly: true },
  )
  deletedAt: Date | null;

  @Field(() => PaymentTypeEntity, { description: 'Payment type of the order.' })
  paymentType: PaymentTypeEntity;

  @Field(() => OrderStatusEntity, { description: 'Status of the order.' })
  orderStatus: OrderStatusEntity;

  @Field(() => StoreEntity, { description: 'Store where the order was generated.' })
  store: StoreEntity;

  constructor(partial: Partial<OrderEntity>) {
    super();
    Object.assign(this, partial);
  }
}
