import { Module } from '@nestjs/common';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CuponsModule } from './cupons/cupons.module';
import { ShippingModule } from './shipping/shipping.module';

@Module({
  imports: [CartsModule, OrdersModule, PaymentsModule, CuponsModule, ShippingModule,]
})
export class SalesModule {}
