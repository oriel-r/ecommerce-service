import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import { PageMetaDto } from './page-meta.dto';

export function createPaginatedResponseDto<T extends Type<any>>(TClass: T) {
  class PaginatedResponse {
    @ApiProperty({ isArray: true, type: TClass })
    readonly data: T[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;
  }
  Object.defineProperty(PaginatedResponse, 'name', {
    value: `Paginated${TClass.name}Response`,
  });
  return PaginatedResponse;
}