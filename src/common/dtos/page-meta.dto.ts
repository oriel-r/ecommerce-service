import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty() readonly totalItems: number;
  @ApiProperty() readonly itemCount: number;
  @ApiProperty() readonly itemsPerPage: number;
  @ApiProperty() readonly totalPages: number;
  @ApiProperty() readonly currentPage: number;
}