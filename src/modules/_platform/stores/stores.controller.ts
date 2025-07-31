import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Store } from './entities/store.entity';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorators';

@ApiTags('Stores')
@UseGuards(AuthGuard, RolesGuard)
@Roles('platform')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una tienda' })
  @ApiResponse({ status: 201, description: 'Tienda creada exitosamente', type: Store })
  @ApiResponse({ status: 404, description: 'Usuario de plataforma no encontrado' })
  createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.createStore(createStoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tiendas' })
  @ApiResponse({ status: 200, description: 'Listado de tiendas', type: [Store] })
  @ApiResponse({ status: 404, description: 'No se encontraron tiendas' })
  findAllStores() {
    return this.storesService.findAllStores();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda encontrada', type: Store })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  findOneById(@Param('id') id: string) {
    return this.storesService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda actualizada exitosamente', type: Store })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  updateStore(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.updateStore(id, updateStoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  deleteStore(@Param('id') id: string) {
    return this.storesService.deleteStore(id);
  }
}

