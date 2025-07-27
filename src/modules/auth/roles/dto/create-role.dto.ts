import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsOptional()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

