import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsNumber } from 'class-validator';

@ObjectType()
export class BaseEntity {
  @Field(() => ID, { description: 'Identifier of the record' })
  @IsNumber()
  id: number;

  @Field(() => Date, { description: 'Date of creation of the record.' })
  @IsDateString()
  createdAt: Date;

  @Field(() => Date, { description: 'Date of the last update of the record.' })
  @IsDateString()
  updatedAt: Date;
}
