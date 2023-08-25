import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmpty, IsString, MinLength, MaxLength, IsUrl } from 'class-validator';

@InputType()
export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @Field()
  name: string;

  @IsEmpty()
  @IsUrl({ require_tld: false })
  @MaxLength(80)
  @Field()
  ecommerceUrl?: string;
}