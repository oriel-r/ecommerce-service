import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@ApiTags('Cities')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiOperation({ summary: 'Buscar o crear una ciudad' })
  @ApiResponse({ status: 201, description: 'Ciudad creada o encontrada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async findOrCreateCity(@Body() createCityDto: CreateCityDto) {
    return await this.cityService.findOrCreateCity(createCityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ciudades' })
  @ApiResponse({ status: 200, description: 'Listado de ciudades' })
  async findAll() {
    return await this.cityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ciudad por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Ciudad encontrada' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  async findOne(@Param('id') id: string) {
    return await this.cityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}

