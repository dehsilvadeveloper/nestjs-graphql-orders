import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { OrderStatusEnum } from '@common/enums/order-status.enum';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderUpdateWithoutDataError } from '../errors/order-update-without-data.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';
import { OrderIsCanceledError } from '../errors/order-is-canceled.error';
import { OrderCannotBeCanceledError } from '../errors/order-cannot-be-canceled.error';
import { OrderIsRefundedError } from '../errors/order-is-refunded.error';
import { OrderCannotBeRefundedError } from '../errors/order-cannot-be-refunded.error';

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

      if (order?.deletedAt instanceof Date) {
        throw new OrderIsDeletedError(`Cannot proceed. The order #${id} was removed`);
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

      return plainToClass(OrderEntity, updatedOrder);
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

  async cancel(id: number): Promise<OrderEntity> {
    try {
      const order = await this.prismaService.order.findFirst({
        where: {
          id: id,
        },
      });

      if (order?.deletedAt instanceof Date) {
        throw new OrderIsDeletedError(`Cannot proceed. The order #${id} was removed`);
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

  async refund(id: number) {
    try {
      const order = await this.prismaService.order.findFirst({
        where: {
          id: id,
        },
      });

      if (order?.deletedAt instanceof Date) {
        throw new OrderIsDeletedError(`Cannot proceed. The order #${id} was removed`);
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
