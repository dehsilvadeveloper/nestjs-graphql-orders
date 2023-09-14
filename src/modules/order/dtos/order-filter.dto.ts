import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Filterable columns for orders list.' })
export class OrderFilterDto {
  @Field({ description: 'Origin of the order.', nullable: true })
  origin?: string;

  @Field({ description: 'Payment type of the order.', nullable: true })
  paymentTypeId?: number;

  @Field({ description: 'Status of the order.', nullable: true })
  orderStatusId: number;

  @Field({ description: 'Store from where the order came.', nullable: true })
  storeId: number;
}
