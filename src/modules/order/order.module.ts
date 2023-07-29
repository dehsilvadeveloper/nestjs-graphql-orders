import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';

@Module({
  providers: [OrderService],
})
export class OrderModule {}
