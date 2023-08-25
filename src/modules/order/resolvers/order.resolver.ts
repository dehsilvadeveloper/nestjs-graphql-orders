import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => OrderEntity, { name: 'createOrder' })
  async createOrder(@Args('data') data: CreateOrderDto): Promise<OrderEntity> {
    return this.orderService.create(data);
  }
}
