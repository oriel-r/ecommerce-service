import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInPlatformUserDto {
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
}
