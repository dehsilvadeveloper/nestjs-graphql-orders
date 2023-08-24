import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@ObjectType()
export class BaseEntity {
  @Field(() => ID, { description: 'Identifier of the record' })
  @IsNumber()
  id: number;

  @Field(() => Date, { description: 'Date of creation of the record.' })
  @IsDateString()
  @Transform(value => format(value.value, 'dd/MM/yyyy HH:mm:ss'))
  createdAt: Date;

  @Field(() => Date, { description: 'Date of the last update of the record.' })
  @IsDateString()
  @Transform(value => format(value.value, 'dd/MM/yyyy HH:mm:ss'))
  updatedAt: Date;
}
