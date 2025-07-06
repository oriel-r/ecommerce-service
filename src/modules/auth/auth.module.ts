import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [ RolesModule, MembersModule]
})
export class AuthModule {}
