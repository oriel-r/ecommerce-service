import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformUserWithStoreDto } from './create-platform-user-with-store.dto';

export class UpdatePlatformUserDto extends PartialType(CreatePlatformUserWithStoreDto) {}
