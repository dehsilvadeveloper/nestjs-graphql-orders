import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '@database/database.module';
import { HealthResolver } from './resolvers/health.resolver';
import { HealthService } from './services/health.service';

@Module({
  imports: [HttpModule, TerminusModule, DatabaseModule],
  providers: [HealthService, HealthResolver],
})
export class HealthModule {}
