import { NotFoundException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

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
    return await this.orderService.create(data);
  }

  @Mutation(() => OrderEntity, { name: 'updateOrder' })
  async updateOrder(@Args('id') id: number, @Args('data') data: UpdateOrderDto): Promise<OrderEntity> {
    return await this.orderService.update(id, data);
  }

  @Query(() => OrderEntity, { name: 'getOrderById', nullable: true })
  async getOrderById(@Args('id') id: number): Promise<OrderEntity> {
    const order = await this.orderService.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    return order;
  }
}
