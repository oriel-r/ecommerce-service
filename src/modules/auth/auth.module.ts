import { forwardRef, Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { MembersModule } from './members/members.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PlatformModule } from '../_platform/_platform.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './members/entities/member.entity';
import { PlatformUser } from '../_platform/platform-users/entities/platform-user.entity';
import { Store } from '../_platform/stores/entities/store.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Member, PlatformUser, Store])
  ,RolesModule, MembersModule,  forwardRef(() => PlatformModule),],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule], 
})
export class AuthModule {}
