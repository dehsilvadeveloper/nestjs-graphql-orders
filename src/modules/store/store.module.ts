import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { StoreResolver } from './resolvers/store.resolver';
import { CreateStoreService } from './services/create-store.service';
import { DeleteStoreService } from './services/delete-store.service';
import { GetStoreService } from './services/get-store.service';
import { UpdateStoreService } from './services/update-store.service';

@Module({
  imports: [DatabaseModule],
  providers: [CreateStoreService, DeleteStoreService, GetStoreService, UpdateStoreService, StoreResolver],
})
export class StoreModule {}
