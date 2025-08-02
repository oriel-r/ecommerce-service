import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@ApiTags('Provinces')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  @ApiOperation({ summary: 'Buscar o crear una provincia' })
  @ApiResponse({ status: 201, description: 'Provincia creada o encontrada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async findOrCreateProvince(@Body() createProvinceDto: CreateProvinceDto) {
    return await this.provinceService.findOrCreateProvince(createProvinceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las provincias' })
  @ApiResponse({ status: 200, description: 'Listado de provincias' })
  async findAll() {
    return await this.provinceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una provincia por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Provincia encontrada' })
  @ApiResponse({ status: 404, description: 'Provincia no encontrada' })
  async findOne(@Param('id') id: string) {
    return await this.provinceService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvinceDto: UpdateProvinceDto) {
    return this.provinceService.update(+id, updateProvinceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinceService.remove(+id);
  }
}

