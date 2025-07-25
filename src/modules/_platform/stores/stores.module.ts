import { forwardRef, Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { MembersModule } from 'src/modules/auth/members/members.module';
import { PlatformUser } from '../platform-users/entities/platform-user.entity';
import { RolesModule } from 'src/modules/auth/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Store, PlatformUser]), 
  forwardRef(() => MembersModule),
],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService, TypeOrmModule]
})
export class StoresModule {}
