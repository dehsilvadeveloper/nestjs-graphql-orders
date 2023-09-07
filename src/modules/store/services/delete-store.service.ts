import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { PrismaErrorEnum } from '@common/enums/prisma-error.enum';
import { StoreEntity } from '../entities/store.entity';
import { StoreNotFoundError } from '../errors/store-not-found.error';
import { StoreIsDeletedError } from '../errors/store-is-deleted.error';

@Injectable()
export class DeleteStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async delete(id: number): Promise<StoreEntity> {
    try {
      const store = await this.prismaService.store.findFirst({
        where: {
          id: id,
        },
      });

      if (!store) {
        throw new StoreNotFoundError(id);
      }

      if (store?.deletedAt instanceof Date) {
        throw new StoreIsDeletedError(`Cannot proceed. The store #${id} was already deleted`);
      }

      const deletedStore = await this.prismaService.store.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return plainToClass(StoreEntity, deletedStore);
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
