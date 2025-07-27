import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { ProvinceModule } from './province/province.module';
import { AddressModule } from './address/address.module';
@Module({
  imports: [AddressModule, CityModule, ProvinceModule],
  exports: [AddressModule, CityModule, ProvinceModule],
})
export class GeographyModule {}
