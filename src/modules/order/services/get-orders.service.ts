import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '@database/prisma/prisma.service';
import { OrderEntity } from '../entities/order.entity';
import { PaginationOptionsDto } from '@common/dtos/pagination-options.dto';
import { OrderFilterDto } from '../dtos/order-filter.dto';

@Injectable()
export class GetOrdersService {
  constructor(private readonly configService: ConfigService, private readonly prismaService: PrismaService) {}

  async findAll(filters?: OrderFilterDto, paginationOptions?: PaginationOptionsDto): Promise<OrderEntity[]> {
    const where: Prisma.OrderWhereInput = {
      ...filters,
    }

    const page = paginationOptions?.page || 1;
    const pageSize = paginationOptions?.pageSize || this.configService.getOrThrow<number>('pagination.pageSize');
    const limit = pageSize;
    const offset = (page - 1) * limit;

    const orders = await this.prismaService.order.findMany({
      where,
      include: {
        paymentType: true,
        orderStatus: true,
        store: true,
      },
      take: limit,
      skip: offset,
    });

    return plainToInstance(OrderEntity, orders);
  }
}
