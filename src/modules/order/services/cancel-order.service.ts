import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderIsCanceledError } from '../errors/order-is-canceled.error';
import { OrderCannotBeCanceledError } from '../errors/order-cannot-be-canceled.error';

@Injectable()
export class CancelOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async cancel(id: number): Promise<OrderEntity> {
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
        throw new OrderIsDeletedError(`Cannot proceed. The order #${id} was deleted`);
      }

      if (order?.orderStatusId == OrderStatusEnum.canceled) {
        throw new OrderIsCanceledError(`Cannot proceed. The order #${id} is already canceled`);
      }

      if (order?.orderStatusId != OrderStatusEnum.pending) {
        throw new OrderCannotBeCanceledError(`Cannot proceed. Only pending orders can be canceled`);
      }

      const canceledOrder = await this.prismaService.order.update({
        where: {
          id: id,
        },
        data: {
          canceledAt: new Date(),
          orderStatusId: OrderStatusEnum.canceled,
        },
        include: {
          paymentType: true,
          orderStatus: true,
          store: true,
        },
      });

      return plainToClass(OrderEntity, canceledOrder);
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
