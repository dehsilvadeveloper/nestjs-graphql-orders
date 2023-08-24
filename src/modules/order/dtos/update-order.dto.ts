import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateOrderDto } from './create-order.dto';

@InputType()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Field(() => Int)
  id: number;
}
