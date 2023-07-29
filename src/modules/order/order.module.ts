import { Module } from '@nestjs/common';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderService } from './services/order.service';

@Module({
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
