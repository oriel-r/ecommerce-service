import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/modules/_support/geography/address/dto/create-address.dto';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message:
      'La contraseña debe tener al menos una mayúscula, una minúscula y un número',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsNotEmpty()
  cuit: string;

  @IsString()
  @IsNotEmpty()
  taxCondition: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];
}



