import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min, Max, IsOptional } from 'class-validator';

@ArgsType()
export class PaginationOptionsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Field(() => Int, { description: 'Number of active page', nullable: true })
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  @Field(() => Int, { description: 'Size of items of pagination', nullable: true })
  pageSize?: number;
}
