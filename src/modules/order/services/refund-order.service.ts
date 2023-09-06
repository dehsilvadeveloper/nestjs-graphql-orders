import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { OrderEntity } from '../entities/order.entity';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderIsRefundedError } from '../errors/order-is-refunded.error';
import { OrderCannotBeRefundedError } from '../errors/order-cannot-be-refunded.error';

@Injectable()
export class RefundOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async refund(id: number): Promise<OrderEntity> {
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

      if (order?.orderStatusId == OrderStatusEnum.refunded) {
        throw new OrderIsRefundedError(`Cannot proceed. The order #${id} is already refunded`);
      }

      if (order?.orderStatusId != OrderStatusEnum.paid) {
        throw new OrderCannotBeRefundedError(`Cannot proceed. Only paid orders can be refunded`);
      }

      const refundedOrder = await this.prismaService.order.update({
        where: {
          id: id,
        },
        data: {
          refundedAt: new Date(),
          orderStatusId: OrderStatusEnum.refunded,
        },
        include: {
          paymentType: true,
          orderStatus: true,
          store: true,
        },
      });

      return plainToClass(OrderEntity, refundedOrder);
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
