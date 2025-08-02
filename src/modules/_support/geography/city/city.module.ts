import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { ProvinceModule } from '../province/province.module';

@Module({
  imports: [TypeOrmModule.forFeature([City]), ProvinceModule],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule {}
