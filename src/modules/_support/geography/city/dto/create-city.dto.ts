import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  provinceId: string;
}

