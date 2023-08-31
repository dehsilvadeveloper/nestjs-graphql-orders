import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('SimpleResponse')
export class SimpleResponse {
  @Field(() => String, { name: 'message' })
  message: string;
}
