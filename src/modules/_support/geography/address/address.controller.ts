import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva dirección para un miembro' })
  createAddress(
    @Body() createAddressDto: CreateAddressDto
  ) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Get('member/:memberId')
  @ApiOperation({ summary: 'Obtener todas las direcciones de un miembro' })
  @ApiParam({ name: 'memberId', type: 'string' })
  findAllByMember(@Param('memberId') memberId: string) {
    return this.addressService.findAllByMember(memberId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una dirección por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una dirección por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una dirección por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}

