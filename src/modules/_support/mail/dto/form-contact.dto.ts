import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FormContactDto {
  @ApiProperty({
    title: 'Remitente',
    description: 'Dirección de correo electrónico del usuario',
    example: 'user1@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    title: 'Asunto',
    description: 'Nombre del usuario',
    example: 'Jhon',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiPropertyOptional({
    title: 'Apellido',
    description: 'Apellido del usuario',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiProperty({
    title: 'Mensaje',
    description: 'Contenido del mensaje del usuario',
    example: 'Pregunta acerca de precios',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
