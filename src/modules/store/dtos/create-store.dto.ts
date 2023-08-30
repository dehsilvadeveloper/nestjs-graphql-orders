import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsUrl } from 'class-validator';

@InputType()
export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @Field()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @MaxLength(80)
  @Field()
  ecommerceUrl?: string;
}