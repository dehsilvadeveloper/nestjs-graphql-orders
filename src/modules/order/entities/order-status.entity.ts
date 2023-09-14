import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Entity for table order_status.' })
export class OrderStatusEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'Name of the order status.' })
  name: string;
}
