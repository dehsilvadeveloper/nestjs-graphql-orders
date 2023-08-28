import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { StoreEntity } from '../entities/store.entity';

@Injectable()
export class StoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStoreDto: CreateStoreDto): Promise<StoreEntity> {
    const storeCreated = await this.prismaService.store.create({
      data: createStoreDto,
    });

    return plainToClass(StoreEntity, storeCreated);
  }

  async findById(id: number): Promise<StoreEntity | null> {
    const store = await this.prismaService.store.findFirst({
      where: {
        id: id,
      },
    });

    return plainToClass(StoreEntity, store);
  }
}
