import { forwardRef, Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from '../city/city.module';
import { MembersModule } from 'src/modules/auth/members/members.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), 
  CityModule, 
  forwardRef(() => MembersModule)],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService]
})
export class AddressModule {}
