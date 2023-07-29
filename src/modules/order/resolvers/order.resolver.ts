import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class OrderResolver {
  @Query(() => String)
  async listOrders() {
    return 'hello from graphql';
  }
}
