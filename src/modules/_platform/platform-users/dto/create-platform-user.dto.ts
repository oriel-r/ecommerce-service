import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePlatformUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}