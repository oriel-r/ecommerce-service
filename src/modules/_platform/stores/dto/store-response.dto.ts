import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class StoreResponseDto {
  @ApiProperty({ example: 'f39cfd68-20a9-4eab-bb3f-e8883c1d9723' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Tienda Bonita' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'tiendabonita.com' })
  @Expose()
  domain: string;

  @ApiProperty({ example: true })
  @Expose()
  isActive: boolean;

  @ApiProperty({ example: '2025-07-15T14:12:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-07-15T15:00:00.000Z' })
  @Expose()
  updatedAt: Date;
}

