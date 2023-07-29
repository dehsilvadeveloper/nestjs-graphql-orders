import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OrderRepository } from '@modules/order/repositories/order.repository';
import { OrderPrismaRepository } from './prisma/repositories/order.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: OrderRepository,
      useClass: OrderPrismaRepository,
    },
  ],
  exports: [OrderRepository],
})
export class DatabaseModule {}
