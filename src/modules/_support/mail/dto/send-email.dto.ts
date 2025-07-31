import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiPropertyOptional({
    title: 'Remitente',
    description: 'Dirección de correo electrónico del remitente del mensaje',
    example: 'info@gf-instalaShop.com',
  })
  @IsEmail()
  @IsOptional()
  from?: string;

  @ApiPropertyOptional({
    title: 'Destinatarios',
    description: 'Lista de direcciones de correo electrónico de los destinatarios del mensaje',
    example: ['user1@example.com', 'user2@example.com'],
  })
  @ValidateIf((o) => typeof o.to === 'string' || Array.isArray(o.to))
  @IsEmail({}, { each: true })
  @IsOptional()
  to?: string | string[];

  @ApiProperty({
    title: 'Asunto',
    description: 'Asunto descriptivo del mail',
    example: 'Notificación acerca de cambios en precios',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    title: 'Mensaje',
    description: 'Contenido del mail (texto plano)',
    example: 'Tenemos nuevos precios',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    description: 'Contenido del mail en formato HTML',
    example: '<b>Tenemos nuevos precios</b>',
  })
  @IsOptional()
  html?: string;
}
