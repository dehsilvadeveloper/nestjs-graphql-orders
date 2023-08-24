import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderService } from './services/order.service';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
