import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailController } from './mail.controller';
import { ContactMessage } from '../notifications/providers/mail/entities/contact-message.entity';
import { MailService } from '../notifications/providers/mail/mail.service';

const isProduction = process.env.ENVIRONMENT === 'PRODUCTION';

const templateDir = isProduction
  ? join(process.cwd(), 'dist', 'modules', '_support', 'mail', 'templates')
  : join(process.cwd(), 'src', 'modules', '_support', 'mail', 'templates');

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactMessage]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: Number(configService.get('MAIL_PORT')),
          secure: configService.get('MAIL_SECURE') === 'true',
          auth: {
            user: configService.get<string>('MAIL_USERNAME'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `CódigoTotal <${configService.get<string>('MAIL_USERNAME')}>`,
        },
        template: {
          dir: templateDir,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

