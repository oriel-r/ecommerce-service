import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications.service";

@Injectable()
export class NotificationListeners {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    
}