import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { UpdateStoreDto } from '../dtos/update-store.dto';
import { StoreEntity } from '../entities/store.entity';
import { StoreUpdateWithoutDataError } from '../errors/store-update-without-data.error';
import { StoreNotFoundError } from '../errors/store-not-found.error';

@Injectable()
export class StoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStoreDto: CreateStoreDto): Promise<StoreEntity> {
    const storeCreated = await this.prismaService.store.create({
      data: createStoreDto,
    });

    return plainToClass(StoreEntity, storeCreated);
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    try {
      if (Object.keys(updateStoreDto).length === 0) {
        throw new StoreUpdateWithoutDataError(id);
      }

      const updatedStore = await this.prismaService.store.update({
        where: {
          id: id,
        },
        data: updateStoreDto,
      });

      return plainToClass(StoreEntity, updatedStore);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaErrorEnum.recordsRequiredForOperationNotFound
      ) {
        throw new StoreNotFoundError(id);
      }

      throw error;
    }
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
