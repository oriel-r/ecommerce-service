import { Module } from '@nestjs/common';
import { NotificationListeners } from './listeners/notification.listeners';
import { NotificationsService } from './notifications.service';
import { MailModule } from './providers/mail/mail.module';
import { OrdersModule } from 'src/modules/sales/orders/orders.module';
import { MembersModule } from 'src/modules/auth/members/members.module';

@Module({
    imports: [
        OrdersModule,
        MembersModule,
        MailModule
    ],
    providers: [NotificationListeners, NotificationsService]
})
export class NotificationsModule {}
