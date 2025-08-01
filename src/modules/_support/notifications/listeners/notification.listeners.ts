import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications.service";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class NotificationListeners {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    @OnEvent('')
    async paymentRecived () {
        return
    }

    @OnEvent('')
    async orderCreated () {
        return
    }
}