import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOrderDto } from './create-order.dto';

@InputType()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
