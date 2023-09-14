import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';
import { BaseEntity } from '@common/entities/base.entity';

@ObjectType({ description: 'Entity for table store.' })
export class StoreEntity extends BaseEntity {
  @Field(() => String, { description: 'Name of the store.' })
  name: string;

  @Field(() => String, { nullable: true, description: 'Url of the e-commerce of the store.' })
  ecommerceUrl: string | null;

  @Field(() => String, { nullable: true, description: 'Date of removal of the store.' })
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
}
