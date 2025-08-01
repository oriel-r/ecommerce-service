import { Module } from '@nestjs/common';
import { GeographyModule } from './geography/geography.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [GeographyModule, NotificationsModule],
  exports: [GeographyModule, NotificationsModule],
})
export class SupportModule {}
