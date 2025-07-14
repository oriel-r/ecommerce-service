import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePlatformUserWithStoreDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  storeName: string;

  @IsNotEmpty()
  domain: string;
}

