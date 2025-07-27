import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsOptional()
  @IsString()
  apartment_floor?: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsUUID()
  @IsNotEmpty()
  cityId: string; 
}

