import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsUrl } from 'class-validator';

@InputType({ description: 'Fields to create a new store.' })
export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @Field({ description: 'Name of the store.' })
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @MaxLength(80)
  @Field({ description: 'Url of the e-commerce of the store.' })
  ecommerceUrl?: string;
}
