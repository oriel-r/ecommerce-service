import { Module } from '@nestjs/common';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CuponsModule } from './cupons/cupons.module';

@Module({
  imports: [CartsModule, OrdersModule, PaymentsModule, CuponsModule,]
})
export class SalesModule {}
