import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir un archivo al bucket' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a subir',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Archivo subido correctamente',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://storage.googleapis.com/mi-bucket/archivo.jpg' },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.uploadsService.uploadFile(file);
    return { url: fileUrl };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los archivos del bucket' })
  @ApiResponse({
    status: 200,
    description: 'Lista de archivos',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', example: 'https://storage.googleapis.com/mi-bucket/archivo.jpg' },
        },
      },
    },
  })
  async listFiles() {
    const files = await this.uploadsService.listFiles();
    return { files };
  }

  @Delete(':filename')
  @ApiOperation({ summary: 'Borrar un archivo por nombre' })
  @ApiParam({ name: 'filename', description: 'Nombre del archivo a borrar en el bucket, el que viene al final en la url "archivo.jpg"' })
  @ApiResponse({
    status: 200,
    description: 'Archivo eliminado correctamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Archivo eliminado correctamente' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Error al eliminar el archivo' })
  async deleteFile(@Param('filename') filename: string) {
    return await this.uploadsService.deleteFile(filename);
  }
}
  