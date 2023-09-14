import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderUpdateWithoutDataError } from '../errors/order-update-without-data.error';

@Injectable()
export class UpdateOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    try {
      if (Object.keys(updateOrderDto).length === 0) {
        throw new OrderUpdateWithoutDataError(id);
      }

      const order = await this.prismaService.order.findFirst({
        where: {
          id: id,
        },
      });

      if (!order) {
        throw new OrderNotFoundError(id);
      }

      if (order?.deletedAt instanceof Date) {
        throw new OrderIsDeletedError(`Cannot proceed. The order #${id} was deleted`);
      }

      const updatedOrder = await this.prismaService.order.update({
        where: {
          id: id,
        },
        data: updateOrderDto,
        include: {
          paymentType: true,
          orderStatus: true,
          store: true,
        },
      });

      return plainToInstance(OrderEntity, updatedOrder);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaErrorEnum.recordsRequiredForOperationNotFound
      ) {
        throw new OrderNotFoundError(id);
      }

      throw error;
    }
  }
}
