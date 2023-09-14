import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Entity for table payment_type.' })
export class PaymentTypeEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'Name of the payment type.' })
  name: string;
}
