import { Order as PrismaOrder } from '@prisma/client';
import { OrderEntity } from '@modules/order/entities/order.entity';
import { OrderStatusEntity } from '@modules/order/entities/order-status.entity';
import { PaymentTypeEntity } from '@modules/order/entities/payment-type.entity';
import { OrderOriginEnum } from '@shared/enums/order-origin.enum';

export class OrderPrismaMapper {
  private constructor() {
    throw new Error('OrderPrismaMapper is a static class and should not be instantiated');
  }

  public static toPrisma(order: OrderEntity): PrismaOrder {
    return {
      id: order.id,
      total: order.total,
      freightValue: order.freightValue,
      discount: order.discount,
			origin: OrderOriginEnum,
			createdAt: order.createdAt,
			updatedAt: order.updatedAt,
			paidAt: order.paidAt,
			deletedAt: order.deletedAt,
			paymentType: PaymentTypeEntity,
			orderStatus: OrderStatusEntity,
    };
  }

  public static toDomain(prismaOrder: PrismaOrder): OrderEntity {
    return new OrderEntity({
			id: prismaOrder.id,
		});
  }
}
