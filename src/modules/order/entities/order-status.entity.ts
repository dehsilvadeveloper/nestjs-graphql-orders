import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderStatusEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'Name of the order status.' })
  name: string;
}
