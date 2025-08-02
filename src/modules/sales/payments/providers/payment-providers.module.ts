import { Module } from '@nestjs/common';
import { MercadopagoModule } from './mercadopago/mercadopago.module';

@Module({
  imports: [MercadopagoModule],
  exports: [MercadopagoModule]
})
export class PaymentProvidersModule {}
