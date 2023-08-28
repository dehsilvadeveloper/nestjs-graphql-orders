import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderService {
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

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.prismaService.order.update({
      where: {
        id: id,
      },
      data: updateOrderDto,
    });

    return plainToClass(OrderEntity, updatedOrder);
  }

  cancel(id: number) {
    return `This action cancel a #${id} order`;
  }

  refund(id: number) {
    return `This action refunds a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order. Its only possible to soft delete pending orders`;
  }

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

  findAll() {
    return `This action returns all orders`;
  }
}
