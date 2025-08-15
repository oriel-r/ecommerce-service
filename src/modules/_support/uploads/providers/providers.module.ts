import { Module } from '@nestjs/common';
import { CloudStorageService } from './cloud_storage/cloud_storage.service';
import { CloudStorageProvider } from './cloud_storage/cloud-storage.provider';

@Module({
  providers: [CloudStorageProvider, CloudStorageService],
  exports: [CloudStorageService],
})
export class ProvidersModule {}