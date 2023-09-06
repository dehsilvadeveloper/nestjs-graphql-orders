import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderCannotBeDeletedError } from '../errors/order-cannot-be-deleted.error';

@Injectable()
export class DeleteOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async delete(id: number): Promise<OrderEntity> {
    try {
      const order = await this.prismaService.order.findFirst({
        where: {
          id: id,
        },
      });

      if (!order) {
        throw new OrderNotFoundError(id);
      }

      if (order?.deletedAt instanceof Date) {
        throw new OrderIsDeletedError(`Cannot proceed. The order #${id} was already deleted`);
      }

      if (order?.orderStatusId != OrderStatusEnum.pending) {
        throw new OrderCannotBeDeletedError(`Cannot proceed. Only pending orders can be deleted`);
      }

      const deletedOrder = await this.prismaService.order.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
        include: {
          paymentType: true,
          orderStatus: true,
          store: true,
        },
      });

      return plainToClass(OrderEntity, deletedOrder);
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
