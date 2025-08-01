import { Module } from '@nestjs/common';
import { MercadopagoModule } from './mercadopago/mercadopago.module';

@Module({
  imports: [MercadopagoModule]
})
export class PaymentProvidersModule {}
