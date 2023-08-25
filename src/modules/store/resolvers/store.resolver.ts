import { NotFoundException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StoreEntity } from '../entities/store.entity';
import { StoreService } from '../services/store.service';
import { CreateStoreDto } from '../dtos/create-store.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Resolver(() => StoreEntity)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Mutation(() => StoreEntity, { name: 'createStore' })
  async createStore(@Args('data') data: CreateStoreDto): Promise<StoreEntity> {
    return this.storeService.create(data);
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
