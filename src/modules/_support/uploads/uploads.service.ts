import { Injectable } from '@nestjs/common';
import { CloudStorageService } from './providers/cloud_storage/cloud_storage.service';

@Injectable()
export class UploadsService {
  constructor(private readonly cloudStorageService: CloudStorageService) {}

  async uploadFile(file: Express.Multer.File) {
    return await this.cloudStorageService.uploadFile(file);
  }

  async listFiles() {
    return await this.cloudStorageService.listFiles();
  }

  async deleteFile(filename: string) {
    return await this.cloudStorageService.deleteFile(filename);
  }
}