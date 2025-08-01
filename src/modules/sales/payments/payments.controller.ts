import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Member } from 'src/modules/auth/members/entities/member.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiWrappedResponse } from 'src/common/decorators/api-wrapped-response/api-wrapped-response.decorator';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { CurrentMember } from 'src/common/decorators/current-curstomer/current-customer.decorator';
import { CurrentCustomer } from 'src/common/interfaces/current-customer.interface';
import { CreatePaymentPreferenceResponseDto } from './dto/create-payment-preference-responde.dto';

@ApiTags('Payments')
@Controller()
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiOperation({
    summary: 'Create a payment preference for an order',
    description: 'Generates a payment link from the payment provider (e.g., Mercado Pago) for a specific order. The user must be the owner of the order.',
  })
  @ApiWrappedResponse(CreatePaymentPreferenceResponseDto)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('orders/:orderId/payment-preference')
  createPaymentPreference(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @CurrentMember() member: CurrentCustomer,
  ) {
    return this.paymentsService.createPaymentPreference(orderId, member);
  }

  @ApiExcludeEndpoint() // Excluimos este endpoint de la documentación pública de Swagger
  @Post('webhooks/mercadopago')
  @HttpCode(HttpStatus.OK)
  mercadoPagoWebhook(@Body() payload: any) {
    // El controlador no procesa el webhook. Solo lo recibe y emite
    // un evento interno para que un servicio desacoplado lo maneje.
    this.eventEmitter.emit('payment.webhook.received', 'mercadopago', payload);
    
    // Responde inmediatamente a Mercado Pago para evitar timeouts y reintentos.
    return { status: 'notification received' };
  }
}