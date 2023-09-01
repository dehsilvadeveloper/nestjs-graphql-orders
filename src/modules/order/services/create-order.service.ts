import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class CreateOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const orderCreated = await this.prismaService.order.create({
      data: createOrderDto,
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
    });

    return plainToClass(OrderEntity, orderCreated);
  }
}
