import { Module } from '@nestjs/common';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CuponsModule } from './cupons/cupons.module';
import { MercadopagoModule } from './payment-providers/mercadopago/mercadopago.module';
import { PaymentProvidersModule } from './payment-providers/payment-providers.module';

@Module({
  imports: [CartsModule, OrdersModule, PaymentsModule, CuponsModule, MercadopagoModule, PaymentProvidersModule,]
})
export class SalesModule {}
