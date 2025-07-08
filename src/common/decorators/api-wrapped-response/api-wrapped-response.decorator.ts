import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../../dtos/api-response.dto';

/**
 * Un decorador personalizado que envuelve la respuesta de la API para Swagger.
 * Combina @ApiResponse con la estructura de nuestro ApiResponseDto genérico.
 *
 * @param dataDto El DTO que representa los datos dentro de la respuesta (ej. UserDto)
 */
export const ApiWrappedResponse = <DataDto extends Type<any>>(dataDto: DataDto) =>
  applyDecorators(
    // 1. Informa a Swagger sobre los "modelos" que vamos a usar como bloques de construcción.
    ApiExtraModels(ApiResponseDto, dataDto),
    
    // 2. Define la respuesta para el código de estado 200 (OK).
    ApiResponse({
      status: 200,
      description: 'Respuesta exitosa',
      schema: {
        // La estructura de la respuesta es una combinación de nuestro DTO base
        // y una especificación de qué tipo va dentro de la propiedad 'data'.
        allOf: [
          // Empieza con la estructura de nuestro DTO base.
          { $ref: getSchemaPath(ApiResponseDto) },
          // Y luego especifica el tipo para la propiedad 'data'.
          {
            properties: {
              data: { $ref: getSchemaPath(dataDto) },
            },
          },
        ],
      },
    }),
  );