import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformUserDto } from './create-platform-user.dto';

export class UpdatePlatformUserDto extends PartialType(CreatePlatformUserDto) {}
