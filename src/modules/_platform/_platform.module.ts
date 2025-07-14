import { forwardRef, Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { PlatformUsersModule } from './platform-users/platform-users.module';

@Module({
  imports: [StoresModule, PlatformUsersModule],
  exports: [StoresModule, PlatformUsersModule],
})
export class PlatformModule {}
