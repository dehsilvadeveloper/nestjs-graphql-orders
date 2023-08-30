import { NotFoundException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StoreEntity } from '../entities/store.entity';
import { StoreService } from '../services/store.service';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { UpdateStoreDto } from '../dtos/update-store.dto';
import { StoreIsDeletedErrorInterceptor } from '../interceptors/store-is-deleted-error.interceptor';
import { StoreUpdateWithoutDataErrorInterceptor } from '../interceptors/store-update-without-data-error.interceptor';
import { StoreNotFoundErrorInterceptor } from '../interceptors/store-not-found-error.interceptor';

@UseInterceptors(
  ClassSerializerInterceptor,
  StoreIsDeletedErrorInterceptor,
  StoreUpdateWithoutDataErrorInterceptor,
  StoreNotFoundErrorInterceptor,
)
@Resolver(() => StoreEntity)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Mutation(() => StoreEntity, { name: 'createStore' })
  async createStore(@Args('data') data: CreateStoreDto): Promise<StoreEntity> {
    return this.storeService.create(data);
  }

  @Mutation(() => StoreEntity, { name: 'updateStore' })
  async updateStore(@Args('id') id: number, @Args('data') data: UpdateStoreDto): Promise<StoreEntity> {
    return await this.storeService.update(id, data);
  }

  @Query(() => StoreEntity, { name: 'getStoreById', nullable: true })
  async getStoreById(@Args('id') id: number): Promise<StoreEntity> {
    const store = await this.storeService.findById(id);

    if (!store) {
      throw new NotFoundException('Store not found.');
    }

    return store;
  }
}
