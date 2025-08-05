import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Req,
  Logger,
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
import { Request } from 'express';
import { MercadoPagoWebhookGuard } from 'src/common/guards/mercado-pago/mercado-pago.guard';

@ApiTags('Payments')
@Controller()
export class PaymentsController {

  private logger = new Logger(PaymentsController.name)
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

  @ApiExcludeEndpoint()
  @UseGuards(MercadoPagoWebhookGuard) 
  @Post('webhooks/mercadopago')
  @HttpCode(HttpStatus.OK)
  mercadoPagoWebhook(
    @Req() req: Request,
    @Body() payload: any
  ) {

    this.eventEmitter.emit('payment.webhook.received', 'mercadopago', payload);
    
    return { status: 'notification received' };
  }
}