import { Expose, Type } from 'class-transformer';
import { StoreResponseDto } from '../../stores/dto/store-response.dto';

export class PlatformUserResponseDto {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => StoreResponseDto) 
  stores: StoreResponseDto[];
}

