import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CloudStorageService } from "./providers/cloud_storage/cloud_storage.service";
import { UploadsController } from "./uploads.controller";
import { CloudStorageProvider } from "./providers/cloud_storage/cloud-storage.provider";
import { UploadsService } from "./uploads.service";


@Module({
  imports: [ConfigModule],
  controllers: [UploadsController],
  providers: [UploadsService, CloudStorageService, CloudStorageProvider],
  exports: [CloudStorageService],
})
export class UploadsModule {}

