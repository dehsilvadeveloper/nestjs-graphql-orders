import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class GetOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<OrderEntity | null> {
    const order = await this.prismaService.order.findFirst({
      where: {
        id: id,
      },
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
    });

    return plainToClass(OrderEntity, order);
  }
}
