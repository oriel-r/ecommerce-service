import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

export const CloudStorageProvider = {
  provide: 'CLOUD_STORAGE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new Storage({
      projectId: configService.get<string>('GCP_PROJECT_ID'),
      keyFilename: configService.get<string>('GCP_KEY_FILE'), 
    });
  },
};