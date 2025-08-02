import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications.service";
import { OnEvent } from "@nestjs/event-emitter";
import { PaymentStatusNotification } from "src/common/enums/payments/payment-notification.enum";
import { OrderNotification } from "src/common/enums/orders/orders-notifications.enum";

@Injectable()
export class NotificationListeners {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    @OnEvent(PaymentStatusNotification.SUCCESSFUL)
    async paymentSuccess (payload: { orderId: string }) {
        return await this.notificationsService.emitSuccessEmails
    }

    @OnEvent(OrderNotification.CREATED)
    async orderCreated (payload: {orderId: string}) {
        return await this.notificationsService.emitOrderCreatedMails(payload.orderId)
    }
}