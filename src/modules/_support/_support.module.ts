import { Module } from '@nestjs/common';
import { GeographyModule } from './geography/geography.module';

@Module({
  imports: [GeographyModule]
})
export class SupportModule {}
