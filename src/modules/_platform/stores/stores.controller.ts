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
import { UpdateStatusStoreDto} from './dto/update-status-store.dto';

@ApiTags('Stores')
//@UseGuards(AuthGuard, RolesGuard)
@Roles('platform')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una tienda' })
  @ApiResponse({ status: 201, description: 'Tienda creada exitosamente', type: Store })
  @ApiResponse({ status: 404, description: 'Usuario de plataforma no encontrado' })
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return await this.storesService.createStore(createStoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tiendas' })
  @ApiResponse({ status: 200, description: 'Listado de tiendas', type: [Store] })
  @ApiResponse({ status: 404, description: 'No se encontraron tiendas' })
  async findAllStores() {
    return await this.storesService.findAllStores();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda encontrada', type: Store })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  async findOneById(@Param('id') id: string) {
    return await this.storesService.findOneById(id);
  }

  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar el estado de una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda actualizada exitosamente', type: Store })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  async updateStatusStore(@Param('id') id: string, @Body() updateStatusStoreDto: UpdateStatusStoreDto) {
    return await this.storesService.updateStatusStore(id, updateStatusStoreDto);
  }

  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda actualizada exitosamente', type: Store })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  async updateStore(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return await this.storesService.updateStore(id, updateStoreDto);
  }
}

