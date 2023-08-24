import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderEntity, { name: 'createOrder' })
  createOrder(@Args('data') data: CreateOrderDto) {
    return this.orderService.create(data);
  }
}
