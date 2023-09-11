import { Resolver, Query } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { HealthService } from '../services/health.service';
import { HealthResponse } from '../responses/health.response';

@Resolver(() => HealthResponse)
export class HealthResolver {
  constructor(private readonly healthService: HealthService) {}

  @Query(() => HealthResponse, { name: 'health' })
  async health(): Promise<HealthResponse> {
    try {
      const healthCheckResult = await this.healthService.healthCheck();

      return {
        status: healthCheckResult.status,
        info: healthCheckResult.info,
        error: healthCheckResult.error,
        details: healthCheckResult.details,
      };
    } catch (error) {
      return {
        status: error.response.status,
        info: error.response.info,
        error: error.response.error,
        details: error.response.details,
      };
    }
  }
}
