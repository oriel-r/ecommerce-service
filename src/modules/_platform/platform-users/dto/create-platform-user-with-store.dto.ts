import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreatePlatformUserWithStoreDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial',
  })
  password: string;

  @IsNotEmpty()
  storeName: string;

  @IsNotEmpty()
  domain: string;
}
