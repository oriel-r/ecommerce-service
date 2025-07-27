import { Expose, Type } from 'class-transformer';
import { Role } from '../../roles/entities/role.entity';

export class MemberResponseDto {
  @Expose()
  id: string;

  @Expose()
  storeId: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => Role)
  role: Role;
}
