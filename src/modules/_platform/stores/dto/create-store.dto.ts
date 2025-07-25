import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsNotEmpty()
  platformUserId: string;
}

