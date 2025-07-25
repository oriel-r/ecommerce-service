import { Expose } from 'class-transformer';

export class StoreResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  domain: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
