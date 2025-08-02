import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({
    example: 'Tienda Bonita',
    description: 'Nombre de la tienda',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'tiendabonita.com',
    description: 'Dominio único para la tienda',
  })
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiProperty({
    example: 'b7c8de50-fdb5-4c72-95fd-2c5f409e2f36',
    description: 'ID del usuario de plataforma que crea la tienda',
  })
  @IsUUID()
  @IsNotEmpty()
  platformUserId: string;
}


