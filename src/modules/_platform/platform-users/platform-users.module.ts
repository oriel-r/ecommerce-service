import { Module } from '@nestjs/common';
import { PlatformUsersService } from './platform-users.service';
import { PlatformUsersController } from './platform-users.controller';

@Module({
  controllers: [PlatformUsersController],
  providers: [PlatformUsersService],
})
export class PlatformUsersModule {}
