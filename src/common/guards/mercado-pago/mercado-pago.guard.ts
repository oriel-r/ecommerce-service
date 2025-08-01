import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { Request } from 'express';

@Injectable()
export class MercadoPagoWebhookGuard implements CanActivate {
   private readonly logger = new Logger(MercadoPagoWebhookGuard.name);

  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const signatureHeader = request.headers['x-signature'] as string;
    const requestId = request.headers['x-request-id'] as string;

    if (!signatureHeader) {
      throw new BadRequestException('Missing x-signature header.');
    }

    // --- ¡LA CORRECCIÓN MÁS IMPORTANTE ESTÁ AQUÍ! ---
    // Se extrae el 'data.id' de los parámetros de la URL (query), no del body.
    const dataId = request.query['data.id'] as string;

    if (!dataId) {
      throw new BadRequestException("Missing 'data.id' in query parameters.");
    }
    // ---------------------------------------------------

    const parts = this.parseSignatureHeader(signatureHeader);
    const timestamp = parts.get('ts');
    const receivedSignature = parts.get('v1');

    if (!timestamp || !receivedSignature) {
      throw new BadRequestException('Invalid signature header format.');
    }

    // Crear el "manifest" EXACTAMENTE como en los ejemplos oficiales.
    const manifest = `id:${dataId};request-id:${requestId};ts:${timestamp};`;

    const secret = this.configService.get<string>('MERCADOPAGO_WEBHOOK_SECRET');
    if (!secret) {
      this.logger.error('Mercado Pago webhook secret is not configured.');
      // Lanza un error genérico para no exponer detalles de la configuración.
      throw new Error('Webhook processing error.');
    }

    // Calcular la firma HMAC SHA256.
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);
    const calculatedSignature = hmac.digest('hex');

    // Comparar las firmas de forma segura para evitar ataques de temporización.
    const areSignaturesEqual = this.secureCompare(
      receivedSignature,
      calculatedSignature,
    );

    if (!areSignaturesEqual) {
      this.logger.warn(`Signature mismatch. Received: ${receivedSignature}, Calculated: ${calculatedSignature}, Manifest: "${manifest}"`);
      throw new ForbiddenException('Invalid webhook signature.');
    }

    this.logger.log(`Webhook signature validated for data.id: ${dataId}`);
    return true;
  }
  
  private parseSignatureHeader(header: string): Map<string, string> {
    return new Map(
      header.split(',').map(part => {
        const [key, value] = part.split('=');
        return [key.trim(), value.trim()];
      })
    );
  }
  
  private secureCompare(a: string, b: string): boolean {
    try {
      // Es crucial que ambos buffers tengan la misma longitud.
      const bufferA = Buffer.from(a);
      const bufferB = Buffer.from(b);
      if (bufferA.length !== bufferB.length) {
        return false;
      }
      return crypto.timingSafeEqual(bufferA, bufferB);
    } catch {
      return false;
    }
  }
}