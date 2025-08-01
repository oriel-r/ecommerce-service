import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PaymentsRepository } from './payments.repository';
import { MercadoPagoService } from './providers/mercadopago/mercadopago.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentStatus } from 'src/common/enums/payment-status.enum';
import { CurrentCustomer } from 'src/common/interfaces/current-customer.interface';
import { CreatePaymentPreferenceResponseDto } from './dto/create-payment-preference-responde.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly ordersService: OrdersService,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createPaymentPreference(orderId: string, member: CurrentCustomer) {
    const order = await this.ordersService.findOne(orderId, member.memberId);

    if (order.status !== 'PENDING_PAYMENT') {
      throw new BadRequestException('Esta orden no se encuentra pendiente de pago.');
    }

    const preference = await this.mercadoPagoService.createPreference(order);
    
        return new CreatePaymentPreferenceResponseDto({
      orderId: order.id,
      preferenceId: preference.id,
      paymentLink: preference.init_point,
    });
  }

  @OnEvent('payment.webhook.received')
  async handlePaymentWebhook(provider: string, payload: any) {
    if (provider !== 'mercadopago') {
      return;
    }

    const processedData = await this.mercadoPagoService.handleWebhookData(payload);
    
    if (!processedData) {
      return;
    }

    const { orderId, transactionId, status, amount, paymentMethod } = processedData;

    const existingPayment = await this.paymentsRepository.findOneBy({ transactionId });
    if (existingPayment) {
      return;
    }

    const payment = this.paymentsRepository.create({
      orderId,
      storeId: processedData.storeId,
      amount,
      paymentMethod,
      transactionId,
      status,
    });
    
    await this.paymentsRepository.save(payment);

    if (status === PaymentStatus.SUCCESSFUL) {
      this.eventEmitter.emit('payment.successful', { orderId });
    } else if (status === PaymentStatus.FAILED) {
      this.eventEmitter.emit('payment.failed', { orderId });
    }
  }

  @OnEvent('payment.successful')
  async handleSuccessfulPayment(payload: { orderId: string }) {
    await this.ordersService.markAsPaid(payload.orderId);
  }
}