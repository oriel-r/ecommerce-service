import { Module } from '@nestjs/common';
import { GeographyModule } from './geography/geography.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [GeographyModule, NotificationsModule, UploadsModule],
  exports: [GeographyModule, NotificationsModule, UploadsModule],
})
export class SupportModule {}
