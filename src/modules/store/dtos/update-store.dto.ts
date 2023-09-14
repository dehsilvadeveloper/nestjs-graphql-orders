import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStoreDto } from './create-store.dto';

@InputType({ description: 'Fields to update a store.' })
export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
