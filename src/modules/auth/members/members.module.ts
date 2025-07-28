import { forwardRef, Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { RolesModule } from '../roles/roles.module';
import { StoresModule } from 'src/modules/_platform/stores/stores.module';
import { AddressModule } from 'src/modules/_support/geography/address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), 
  forwardRef(() => RolesModule),
  forwardRef(() => StoresModule),
  forwardRef(() => AddressModule)
],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService]
})
export class MembersModule {}
