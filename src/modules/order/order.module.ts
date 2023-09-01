import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { OrderResolver } from './resolvers/order.resolver';
import { CancelOrderService } from './services/cancel-order.service';
import { CreateOrderService } from './services/create-order.service';
import { DeleteOrderService } from './services/delete-order.service';
import { GetOrderService } from './services/get-order.service';
import { GetOrdersService } from './services/get-orders.service';
import { RefundOrderService } from './services/refund-order.service';
import { UpdateOrderService } from './services/update-order.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CancelOrderService,
    CreateOrderService,
    DeleteOrderService,
    GetOrderService,
    GetOrdersService,
    RefundOrderService,
    UpdateOrderService,
    OrderResolver,
  ],
})
export class OrderModule {}
