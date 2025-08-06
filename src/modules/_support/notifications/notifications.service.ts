import { Injectable, Logger } from "@nestjs/common";
import { MembersService } from "src/modules/auth/members/members.service";
import { OrdersService } from "src/modules/sales/orders/orders.service";
import { MailService } from "./providers/mail/mail.service";
import Mail from "nodemailer/lib/mailer";

@Injectable()
export class NotificationsService {

    private logger = new Logger(NotificationsService.name)

    constructor (
        private readonly ordersService: OrdersService,
        private readonly membersService: MembersService, 
        private readonly mailsService: MailService
    ) {}

    async emitSuccessEmails(orderId: string) {
        const fullOrder = await this.ordersService.findOne(orderId)
        const {store: {platformUser: {email: platformEmail}}, member: {email: memberEmail, fullName}, totalAmount} = fullOrder
        
        const mailMember = this.mailsService.sendPaymentConfimedCustomer({
            to: memberEmail,
            subject: 'Recibimos tu pagó!',
            context: {
                name: fullName
            }
        })
        const mailAdmin =  this.mailsService.sendPaymentConfimedAdmin({
            to: platformEmail,
            subject: `Pago Exitóso | orden ${orderId}`,
            context: {
                name:  fullName,
                orderId,
                email: memberEmail,
                amount: totalAmount
            }
        })
        const mailCT = this.mailsService.sendPaymentConfimedAdmin({
            to: 'codigototaldevs@gmail.com',
            subject: `Pago Exitóso | orden ${orderId}`,
            context: {
                name: fullName,
                orderId,
                email: memberEmail,
                amount: totalAmount
            }
        })
        
        await Promise.all([mailAdmin, mailMember, mailCT])
        return
    }

    async emitOrderCreatedMails (orderId) {
        const fullOrder = await this.ordersService.findOne(orderId)
        const {store: {platformUser: {email: platformEmail}}, member: {email: memberEmail, fullName}} = fullOrder

        const mailMember = this.mailsService.orderPendintToPayForCustomer({
            to: memberEmail,
            subject: 'Ya apartamos tus poductos!',
            context: {
                name: fullName
            }
        })
        const mailAdmin =  this.mailsService.orderPendintToPayForCustomer({
            to: platformEmail,
            subject: `Orden creada | orden ${orderId}`,
            context: {
                name: fullName
            }
        }) 
        const mailCT = this.mailsService.orderPendintToPayForCustomer({
            to: 'codigototaldevs@gmail.com',
            subject: `Orden creada | orden ${orderId}`,
            context: {
                name: fullName
            }
        })
    
        await Promise.all([mailAdmin, mailMember, mailCT])
    }
}