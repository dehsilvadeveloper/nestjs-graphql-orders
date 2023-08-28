import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@ObjectType()
export class BaseEntity {
  @Field(() => ID, { description: 'Identifier of the record' })
  @IsNumber()
  id: number;

  @Field(() => String, { description: 'Date of creation of the record.' })
  @IsDateString()
  @Transform((value) => format(value.value, 'dd/MM/yyyy HH:mm:ss'), { toPlainOnly: true })
  createdAt: Date;

  @Field(() => String, { description: 'Date of the last update of the record.' })
  @IsDateString()
  @Transform((value) => format(value.value, 'dd/MM/yyyy HH:mm:ss'), { toPlainOnly: true })
  updatedAt: Date;
}
