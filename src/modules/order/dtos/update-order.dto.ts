import { InputType, PartialType, OmitType } from '@nestjs/graphql';
import { CreateOrderDto } from './create-order.dto';

@InputType()
export class UpdateOrderDto extends PartialType(OmitType(CreateOrderDto, ['orderStatusId'])) {}
