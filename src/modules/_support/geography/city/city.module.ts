import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Province } from '../province/entities/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Province])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
