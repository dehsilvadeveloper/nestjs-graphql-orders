import { PrismaService } from '../../prisma.service';
import { OrderEntity } from '@modules/order/entities/order.entity';
import { OrderRepository } from '@modules/order/repositories/order.repository';
import { OrderPrismaMapper } from '../../mappers/order/order.prisma.mapper';

export class OrderPrismaRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<OrderEntity[]> {
    const orderPrismaData = await this.prisma.order.findMany();

    const orders = orderPrismaData.map(OrderPrismaMapper.toDomain);

    return orders;
  }
}
