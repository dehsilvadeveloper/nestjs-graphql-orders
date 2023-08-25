import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { StoreResolver } from './resolvers/store.resolver';
import { StoreService } from './services/store.service';

@Module({
  imports: [DatabaseModule],
  providers: [StoreService, StoreResolver],
})
export class StoreModule {}
