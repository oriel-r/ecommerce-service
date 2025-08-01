import { Injectable } from "@nestjs/common";
import { MembersService } from "src/modules/auth/members/members.service";
import { OrdersService } from "src/modules/sales/orders/orders.service";
import { MailService } from "./providers/mail/mail.service";

@Injectable()
export class NotificationsService {
    constructor (
        private readonly ordersService: OrdersService,
        private readonly membersService: MembersService, 
        private readonly mailsService: MailService
    ) {}


}