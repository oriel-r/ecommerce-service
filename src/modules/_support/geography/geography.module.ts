import { Module } from '@nestjs/common';
import { GeographyService } from './geography.service';
import { GeographyController } from './geography.controller';

@Module({
  controllers: [GeographyController],
  providers: [GeographyService],
})
export class GeographyModule {}
