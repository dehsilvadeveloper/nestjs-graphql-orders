import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class CreateOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    try {
      const data = {
        orderStatusId: OrderStatusEnum.pending,
        ...createOrderDto,
      };

      const orderCreated = await this.prismaService.order.create({
        data: data,
        include: {
          paymentType: true,
          orderStatus: true,
          store: true,
        },
      });

      return plainToInstance(OrderEntity, orderCreated);
    } catch (error) {
      throw error;
    }
  }
}
