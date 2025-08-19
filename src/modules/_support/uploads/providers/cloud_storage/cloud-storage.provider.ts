import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

export const CloudStorageProvider = {
  provide: 'CLOUD_STORAGE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const environment = configService.get<string>('ENVIRONMENT');
    const projectId = configService.get<string>('GCP_PROJECT_ID');

    switch (environment) {
      case 'PRODUCTION':
        // En producción de GCP, se usa ADC. No se requiere keyFilename.
        return new Storage({ projectId });

      case 'STAGING':
        const keyFileContent = configService.get<string>('GCP_SERVICE_ACCOUNT_KEY');
        if (!keyFileContent) {
          throw new Error('GCP_SERVICE_ACCOUNT_KEY is not defined in the STAGING environment.');
        }
        return new Storage({
          projectId,
          credentials: JSON.parse(keyFileContent),
        });

      default:
        const keyFilename = configService.get<string>('GCP_KEY_FILE');
        if (!keyFilename) {
          throw new Error('GCP_KEY_FILE is not defined in the LOCAL environment.');
        }
        return new Storage({
          projectId,
          keyFilename,
        });
    }
  },
};