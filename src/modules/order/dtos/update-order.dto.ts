import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOrderDto } from './create-order.dto';

@InputType({ description: 'Fields to update a order.' })
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
