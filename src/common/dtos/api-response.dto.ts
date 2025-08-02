import { ApiProperty } from '@nestjs/swagger';

/**
 * Este DTO base describe la estructura de envoltura { "data": T }.
 * No se usa directamente en los decoradores, pero es la plantilla
 * que nuestro decorador personalizado utilizará.
 */
export class ApiResponseDto<T> {
  @ApiProperty()
  data: T;
}