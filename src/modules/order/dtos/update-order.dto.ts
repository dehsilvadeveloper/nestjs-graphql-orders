import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';
import { CreateOrderDto } from './create-order.dto';

@InputType()
export class UpdateOrderDto extends PartialType(OmitType(CreateOrderDto, ['orderStatusId'])) {
  @Field(() => Int)
  id: number;
}
