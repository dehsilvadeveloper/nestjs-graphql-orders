import { OrderEntity } from '@modules/order/entities/order.entity';

export abstract class  OrderRepository {
    abstract findAll();
}
