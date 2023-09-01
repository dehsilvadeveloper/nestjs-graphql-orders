import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class GetOrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): string {
    return `This action returns all orders`;
  }
}
