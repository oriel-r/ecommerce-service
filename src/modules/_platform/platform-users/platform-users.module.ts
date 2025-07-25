import { Module } from '@nestjs/common';
import { PlatformUsersService } from './platform-users.service';
import { PlatformUsersController } from './platform-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformUser } from './entities/platform-user.entity';
import { StoresModule } from '../stores/stores.module';
import { Store } from '../stores/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformUser, Store]), StoresModule],
  controllers: [PlatformUsersController],
  providers: [PlatformUsersService],
  exports: [PlatformUsersService],
})
export class PlatformUsersModule {}
