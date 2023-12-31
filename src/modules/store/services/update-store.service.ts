import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { UpdateStoreDto } from '../dtos/update-store.dto';
import { StoreEntity } from '../entities/store.entity';
import { StoreUpdateWithoutDataError } from '../errors/store-update-without-data.error';
import { StoreNotFoundError } from '../errors/store-not-found.error';
import { StoreIsDeletedError } from '../errors/store-is-deleted.error';

@Injectable()
export class UpdateStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<StoreEntity> {
    try {
      if (Object.keys(updateStoreDto).length === 0) {
        throw new StoreUpdateWithoutDataError(id);
      }

      const store = await this.prismaService.store.findFirst({
        where: {
          id: id,
        },
      });

      if (!store) {
        throw new StoreNotFoundError(id);
      }

      if (store?.deletedAt instanceof Date) {
        throw new StoreIsDeletedError(`Cannot proceed. The store #${id} was deleted`);
      }

      const updatedStore = await this.prismaService.store.update({
        where: {
          id: id,
        },
        data: updateStoreDto,
      });

      return plainToInstance(StoreEntity, updatedStore);
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
}
