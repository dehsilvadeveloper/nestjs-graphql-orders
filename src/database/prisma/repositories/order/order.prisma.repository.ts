import { PrismaService } from '../../prisma.service';
import { OrderEntity } from '@modules/order/entities/order.entity';
import { OrderRepository } from '@modules/order/repositories/order.repository';

export class OrderPrismaRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {;
    //return await this.prisma.order.findMany();
  }
}
