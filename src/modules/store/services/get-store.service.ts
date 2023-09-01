import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { StoreEntity } from '../entities/store.entity';

@Injectable()
export class GetStoreService {
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: number): Promise<StoreEntity | null> {
    const store = await this.prismaService.store.findFirst({
      where: {
        id: id,
      },
    });

    return plainToClass(StoreEntity, store);
  }
}
