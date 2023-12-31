import { NotFoundException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StoreEntity } from '../entities/store.entity';
import { CreateStoreService } from '../services/create-store.service';
import { DeleteStoreService } from '../services/delete-store.service';
import { GetStoreService } from '../services/get-store.service';
import { UpdateStoreService } from '../services/update-store.service';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { UpdateStoreDto } from '../dtos/update-store.dto';
import { StoreCannotBeDeletedErrorInterceptor } from '../interceptors/store-cannot-be-deleted-error.interceptor';
import { StoreIsDeletedErrorInterceptor } from '../interceptors/store-is-deleted-error.interceptor';
import { StoreUpdateWithoutDataErrorInterceptor } from '../interceptors/store-update-without-data-error.interceptor';
import { StoreNotFoundErrorInterceptor } from '../interceptors/store-not-found-error.interceptor';
import { SimpleResponse } from '@common/responses/simple.response';

@UseInterceptors(
  ClassSerializerInterceptor,
  StoreCannotBeDeletedErrorInterceptor,
  StoreIsDeletedErrorInterceptor,
  StoreUpdateWithoutDataErrorInterceptor,
  StoreNotFoundErrorInterceptor,
)
@Resolver(() => StoreEntity)
export class StoreResolver {
  constructor(
    private readonly createStoreService: CreateStoreService,
    private readonly deleteStoreService: DeleteStoreService,
    private readonly getStoreService: GetStoreService,
    private readonly updateStoreService: UpdateStoreService,
  ) {}

  @Mutation(() => StoreEntity, { name: 'createStore' })
  async createStore(@Args('data') data: CreateStoreDto): Promise<StoreEntity> {
    return this.createStoreService.create(data);
  }

  @Mutation(() => StoreEntity, { name: 'updateStore' })
  async updateStore(@Args('id') id: number, @Args('data') data: UpdateStoreDto): Promise<StoreEntity> {
    return await this.updateStoreService.update(id, data);
  }

  @Mutation(() => SimpleResponse, { name: 'deleteStore' })
  async deleteStore(@Args('id') id: number): Promise<SimpleResponse> {
    await this.deleteStoreService.delete(id);

    return { message: 'The store was deleted.' };
  }

  @Query(() => StoreEntity, { name: 'getStoreById', nullable: true })
  async getStoreById(@Args('id') id: number): Promise<StoreEntity> {
    const store = await this.getStoreService.findById(id);

    if (!store) {
      throw new NotFoundException(`Store #${id} was not found.`);
    }

    return store;
  }
}
