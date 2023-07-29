import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class OrderResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello from graphql';
  }
}
