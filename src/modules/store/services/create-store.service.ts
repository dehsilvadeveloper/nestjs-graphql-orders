import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { StoreEntity } from '../entities/store.entity';

@Injectable()
export class CreateStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStoreDto: CreateStoreDto): Promise<StoreEntity> {
    const storeCreated = await this.prismaService.store.create({
      data: createStoreDto,
    });

    return plainToInstance(StoreEntity, storeCreated);
  }
}
