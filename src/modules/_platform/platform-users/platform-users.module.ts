import { forwardRef, Module } from '@nestjs/common';
import { PlatformUsersService } from './platform-users.service';
import { PlatformUsersController } from './platform-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformUser } from './entities/platform-user.entity';
import { StoresModule } from '../stores/stores.module';
import { RolesModule } from 'src/modules/auth/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformUser]), forwardRef(() => StoresModule), RolesModule],
  controllers: [PlatformUsersController],
  providers: [PlatformUsersService],
  exports: [PlatformUsersService],
})
export class PlatformUsersModule {}
