import { Controller, Post } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller()
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadoPagoService) {}

  @Post('mp/webhook')
  async recibe() {
    return
  }

}
