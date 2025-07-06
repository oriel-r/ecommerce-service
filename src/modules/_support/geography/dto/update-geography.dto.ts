import { PartialType } from '@nestjs/mapped-types';
import { CreateGeographyDto } from './create-geography.dto';

export class UpdateGeographyDto extends PartialType(CreateGeographyDto) {}
