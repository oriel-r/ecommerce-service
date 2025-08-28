import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { Items } from 'mercadopago/dist/clients/commonTypes';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import { PaymentStatus } from 'src/common/enums/payments/payment-status.enum';
import { Member } from 'src/modules/auth/members/entities/member.entity';
import { Order } from 'src/modules/sales/orders/entities/order.entity';

export interface ProcessedPaymentData {
  orderId: string;
  storeId: string;
  transactionId: string;
  status: PaymentStatus;
  amount: number | undefined;
  paymentMethod: string | undefined;
}

@Injectable()
export class MercadoPagoService {
  private readonly client: MercadoPagoConfig;
  private readonly logger = new Logger(MercadoPagoService.name);

  constructor(private readonly configService: ConfigService) {
    const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('Mercado Pago Access Token is not configured.');
    }
    this.client = new MercadoPagoConfig({ accessToken });
  }

  async createPreference(order: Order): Promise<any> {

    const productItems: Items[] = order.items.map(item => {
      const product = item.productVariant.product;
      const variant = item.productVariant;

      return {
        id: variant.id,
        title: `${product.name} ${variant.optionValue || ''}`.trim(),
        description: product.description?.substring(0, 256) || product.name,
        quantity: item.quantity,
        unit_price: Number(item.priceAtPurchase),
        currency_id: 'ARS', 
        category_id: product.categoryAssignments?.[0]?.category?.name, 
      };
    });

        const allItems = [...productItems];
    if (Number(order.shippingCost) > 0) {
      const shippingItem: Items = {
        id: 'shipping',
        title: 'Costo de Envío',
        description: 'Costo de envío y manejo para tu pedido',
        quantity: 1,
        unit_price: Number(order.shippingCost),
        currency_id: 'ARS',
      };
      allItems.push(shippingItem);
    }

    const preferencePayload: PreferenceRequest = {
      items: allItems,
      back_urls: {
        success: this.configService.get<string>('FRONTEND_URL_SUCCESS'),
        failure: this.configService.get<string>('FRONTEND_URL_FAILURE'),
        pending: this.configService.get<string>('FRONTEND_URL_ṔENDING')
      },
      auto_return: 'approved',
      external_reference: order.id,
      notification_url: this.configService.get<string>('MERCADOPAGO_WEBHOOK_URL'),
      metadata: {
        store_id: order.storeId,
        member_id: order.memberId,
      },
    };

    try {
      this.logger.log(`Creating preference for order: ${order.id}`);
      const preference = new Preference(this.client);
      const result = await preference.create({ 
        body: preferencePayload,
        requestOptions: { idempotencyKey: randomUUID() }
      });

      this.logger.debug(result)
      
      return result;
    } catch (error) {
      this.logger.error('Error creating Mercado Pago preference:', JSON.stringify(error, null, 2));
      throw new Error('Could not create payment preference.');
    }
  }

  async handleWebhookData(payload: any): Promise<ProcessedPaymentData | null> {
    if (payload.type !== 'payment') {
      return null;
    }

    try {
      const paymentId = payload.data.id;
      this.logger.log(`Handling webhook for payment ID: ${paymentId}`);

      const payment = await new Payment(this.client).get({ id: paymentId });
      
      const orderId = payment.external_reference;
      if (!orderId) {
        this.logger.warn(`Payment ${paymentId} received without external_reference. Skipping.`);
        return null;
      }
      
      const status = this.translateStatus(payment.status);

      return {
        orderId,
        storeId: payment.metadata?.store_id, // Asume que guardaste store_id en metadata
        transactionId: String(payment.id),
        status,
        amount: payment.transaction_amount,
        paymentMethod: payment.payment_type_id,
      };

    } catch (error) {
      this.logger.error(`Error processing webhook data:`, error.cause ?? error.message);
      return null;
    }
  }


  private translateStatus(mpStatus?: string): PaymentStatus {
    switch (mpStatus) {
      case 'approved':
        return PaymentStatus.SUCCESSFUL;
      case 'rejected':
      case 'cancelled':
      case 'in_mediation':
        return PaymentStatus.FAILED;
      case 'refunded':
      case 'charged_back':
        return PaymentStatus.REFUNDED;
      case 'in_process':
      case 'pending':
      default:
        return PaymentStatus.PENDING;
    }
  }
}