import { Module } from '@nestjs/common';
import { GeographyModule } from './geography/geography.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [GeographyModule, MailModule],
  exports: [GeographyModule],
})
export class SupportModule {}
