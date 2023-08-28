import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@common/entities/base.entity';

@ObjectType()
export class StoreEntity extends BaseEntity {
  @Field(() => String, { description: 'Name of the store.' })
  name: string;

  @Field(() => String, { nullable: true, description: 'Url of the e-commerce of the store.' })
  ecommerceUrl: string | null;
}
