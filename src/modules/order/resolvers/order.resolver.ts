import { NotFoundException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderEntity } from '../entities/order.entity';
import { CancelOrderService } from '../services/cancel-order.service';
import { CreateOrderService } from '../services/create-order.service';
import { DeleteOrderService } from '../services/delete-order.service';
import { GetOrderService } from '../services/get-order.service';
import { GetOrdersService } from '../services/get-orders.service';
import { RefundOrderService } from '../services/refund-order.service';
import { UpdateOrderService } from '../services/update-order.service';
import { PaginationOptionsDto } from '@common/dtos/pagination-options.dto';
import { OrderFilterDto } from '../dtos/order-filter.dto';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderCannotBeCanceledErrorInterceptor } from '../interceptors/order-cannot-be-canceled-error.interceptor';
import { OrderCannotBeDeletedErrorInterceptor } from '../interceptors/order-cannot-be-deleted-error.interceptor';
import { OrderCannotBeRefundedErrorInterceptor } from '../interceptors/order-cannot-be-refunded-error.interceptor';
import { OrderIsCanceledErrorInterceptor } from '../interceptors/order-is-canceled-error.interceptor';
import { OrderIsDeletedErrorInterceptor } from '../interceptors/order-is-deleted-error.interceptor';
import { OrderIsRefundedErrorInterceptor } from '../interceptors/order-is-refunded-error.interceptor';
import { OrderUpdateWithoutDataErrorInterceptor } from '../interceptors/order-update-without-data-error.interceptor';
import { OrderNotFoundErrorInterceptor } from '../interceptors/order-not-found-error.interceptor';
import { SimpleResponse } from '@common/responses/simple.response';

@UseInterceptors(
  ClassSerializerInterceptor,
  OrderCannotBeCanceledErrorInterceptor,
  OrderCannotBeDeletedErrorInterceptor,
  OrderCannotBeRefundedErrorInterceptor,
  OrderIsCanceledErrorInterceptor,
  OrderIsDeletedErrorInterceptor,
  OrderIsRefundedErrorInterceptor,
  OrderUpdateWithoutDataErrorInterceptor,
  OrderNotFoundErrorInterceptor,
)
@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(
    private readonly cancelOrderService: CancelOrderService,
    private readonly createOrderService: CreateOrderService,
    private readonly deleteOrderService: DeleteOrderService,
    private readonly getOrderService: GetOrderService,
    private readonly getOrdersService: GetOrdersService,
    private readonly refundOrderService: RefundOrderService,
    private readonly updateOrderService: UpdateOrderService,
  ) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => OrderEntity, { name: 'createOrder', description: 'Create a new order.' })
  async createOrder(@Args('data') data: CreateOrderDto): Promise<OrderEntity> {
    return await this.createOrderService.create(data);
  }

  @Mutation(() => OrderEntity, { name: 'updateOrder', description: 'Update a order.' })
  async updateOrder(@Args('id') id: number, @Args('data') data: UpdateOrderDto): Promise<OrderEntity> {
    return await this.updateOrderService.update(id, data);
  }

  @Mutation(() => OrderEntity, { name: 'cancelOrder', description: 'Cancel a order.' })
  async cancelOrder(@Args('id') id: number): Promise<OrderEntity> {
    return await this.cancelOrderService.cancel(id);
  }

  @Mutation(() => OrderEntity, { name: 'refundOrder', description: 'Refund a order.' })
  async refundOrder(@Args('id') id: number): Promise<OrderEntity> {
    return await this.refundOrderService.refund(id);
  }

  @Mutation(() => SimpleResponse, { name: 'deleteOrder', description: 'Delete a order.' })
  async deleteOrder(@Args('id') id: number): Promise<SimpleResponse> {
    await this.deleteOrderService.delete(id);

    return { message: 'The order was deleted.' };
  }

  @Query(() => [OrderEntity], {
    name: 'getOrders',
    description: 'Get a list of orders. The list will be paginated and can be sorted and filtered.',
  })
  async getOrders(
    @Args('filter', { nullable: true }) filters: OrderFilterDto,
    @Args() paginationOptions: PaginationOptionsDto,
  ) {
    return await this.getOrdersService.findAll(filters, paginationOptions);
  }

  @Query(() => OrderEntity, {
    name: 'getOrderById',
    description: 'Get a specific order, searching by id.',
    nullable: true,
  })
  async getOrderById(@Args('id') id: number): Promise<OrderEntity> {
    const order = await this.getOrderService.findById(id);

    if (!order) {
      throw new NotFoundException(`Order #${id} was not found.`);
    }

    return order;
  }
}
