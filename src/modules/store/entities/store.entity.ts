import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoreEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'Name of the store.' })
  name: string;

  @Field(() => String, { nullable: true, description: 'Url of the e-commerce of the store.' })
  ecommerceUrl: string | null;
}
