import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva dirección para un miembro' })
  @ApiResponse({ status: 201, description: 'Dirección creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    return await this.addressService.createAddress(createAddressDto);
  }

  @Get('member/:memberId')
  @ApiOperation({ summary: 'Obtener todas las direcciones de un miembro' })
  @ApiParam({ name: 'memberId', type: String })
  @ApiResponse({ status: 200, description: 'Lista de direcciones obtenida correctamente' })
  @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
  async findAllByMember(@Param('memberId') memberId: string) {
    return await this.addressService.findAllByMember(memberId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una dirección por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Dirección encontrada' })
  @ApiResponse({ status: 404, description: 'Dirección no encontrada' })
  async findOne(@Param('id') id: string) {
    return await this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una dirección por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Dirección actualizada correctamente' })
  @ApiResponse({ status: 404, description: 'Dirección no encontrada' })
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return await this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una dirección por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Dirección eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Dirección no encontrada' })
  async remove(@Param('id') id: string) {
    return await this.addressService.remove(id);
  }
}


