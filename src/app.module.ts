import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { config } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database.module';
import { OrderModule } from '@modules/order/order.module';
import { StoreModule } from '@modules/store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        playground: configService.getOrThrow<boolean>('graphql.playgroundEnabled'),
        autoSchemaFile: join(
          process.cwd(),
          `${configService.getOrThrow<string>('graphql.schemaOutputDir')}` +
            `${configService.getOrThrow<string>('graphql.schemaOutputFile')}`,
        ),
        debug: configService.getOrThrow<boolean>('graphql.debugEnabled'),
        sortSchema: configService.getOrThrow<boolean>('graphql.sortSchemaEnabled')
      }),
      inject: [ConfigService],
    }),
    OrderModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
