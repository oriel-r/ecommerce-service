import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaxCondition } from 'src/common/enums/tax-condition.enum';

export class UpdateMemberBillingDto {
  @IsOptional()
  @IsString()
  cuit?: string;

  @IsOptional()
  @IsEnum(TaxCondition)
  taxCondition?: TaxCondition;
}
