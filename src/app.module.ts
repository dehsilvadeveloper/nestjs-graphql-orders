import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { config } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database.module';
import { OrderModule } from '@modules/order/order.module';

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
        playground: configService.getOrThrow<boolean>(
          'graphql.playgroundEnabled',
        ),
        autoSchemaFile:
          `${configService.getOrThrow<string>('graphql.schemaOutputDir')}` +
          `${configService.getOrThrow<string>('graphql.schemaOutputFile')}`,
      }),
      inject: [ConfigService],
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
