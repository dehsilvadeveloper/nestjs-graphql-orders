import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType('HealthResponse')
export class HealthResponse {
  @Field(() => String, { name: 'status' })
  status: string;

  @Field(() => GraphQLJSONObject , { name: 'info', nullable: true })
  info?: object;

  @Field(() => GraphQLJSONObject, { name: 'error', nullable: true })
  error?: object;

  @Field(() => GraphQLJSONObject, { name: 'details', nullable: true })
  details?: object;
}
