import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../../dtos/api-response.dto';

export const ApiWrappedResponse = <DataDto extends Type<any>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(ApiResponseDto, dataDto),
    ApiResponse({
      status: 200,
      description: 'Respuesta exitosa',
      content: {
        'application/json': {
          schema: {
            allOf: [
              { $ref: getSchemaPath(ApiResponseDto) },
              {
                type: 'object',
                properties: {
                  data: { $ref: getSchemaPath(dataDto) },
                },
                required: ['data'],
              },
            ],
          },
        },
      },
    }),
  );
