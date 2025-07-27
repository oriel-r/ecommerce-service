import { forwardRef, Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { MembersModule } from './members/members.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PlatformModule } from '../_platform/_platform.module';

@Module({
  imports: [RolesModule, MembersModule, forwardRef(() => PlatformModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [RolesModule, MembersModule], 
})
export class AuthModule {}
