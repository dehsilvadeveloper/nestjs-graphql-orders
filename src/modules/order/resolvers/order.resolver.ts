import { NotFoundException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderCannotBeCanceledErrorInterceptor } from '../interceptors/order-cannot-be-canceled-error.interceptor';
import { OrderCannotBeRefundedErrorInterceptor } from '../interceptors/order-cannot-be-refunded-error.interceptor';
import { OrderIsCanceledErrorInterceptor } from '../interceptors/order-is-canceled-error.interceptor';
import { OrderIsDeletedErrorInterceptor } from '../interceptors/order-is-deleted-error.interceptor';
import { OrderIsRefundedErrorInterceptor } from '../interceptors/order-is-refunded-error.interceptor';
import { OrderUpdateWithoutDataErrorInterceptor } from '../interceptors/order-update-without-data-error.interceptor';
import { OrderNotFoundErrorInterceptor } from '../interceptors/order-not-found-error.interceptor';

@UseInterceptors(
  ClassSerializerInterceptor,
  OrderCannotBeCanceledErrorInterceptor,
  OrderCannotBeRefundedErrorInterceptor,
  OrderIsCanceledErrorInterceptor,
  OrderIsDeletedErrorInterceptor,
  OrderIsRefundedErrorInterceptor,
  OrderUpdateWithoutDataErrorInterceptor,
  OrderNotFoundErrorInterceptor,
)
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

  @Mutation(() => OrderEntity, { name: 'cancelOrder' })
  async cancelOrder(@Args('id') id: number): Promise<OrderEntity> {
    return await this.orderService.cancel(id);
  }

  @Mutation(() => OrderEntity, { name: 'refundOrder' })
  async refundOrder(@Args('id') id: number): Promise<OrderEntity> {
    return await this.orderService.refund(id);
  }

  @Query(() => OrderEntity, { name: 'getOrderById', nullable: true })
  async getOrderById(@Args('id') id: number): Promise<OrderEntity> {
    const order = await this.orderService.findById(id);

    if (!order) {
      throw new NotFoundException(`Order #${id} was not found.`);
    }

    return order;
  }
}
