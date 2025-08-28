import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
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
import { request, Request, RequestHandler } from 'express';
import { CreateStoreConfigurationDto } from './dto/create-store-config.dto';

@ApiTags('Stores')
@Roles('platform')
@Controller()
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post('stores')
  @ApiOperation({ summary: 'Crear una tienda' })
  @ApiResponse({ status: 201, description: 'Tienda creada exitosamente', type: Store })
  @ApiResponse({ status: 404, description: 'Usuario de plataforma no encontrado' })
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return await this.storesService.createStore(createStoreDto);
  }

  @Get('stores')
  @ApiOperation({ summary: 'Obtener todas las tiendas' })
  @ApiResponse({ status: 200, description: 'Listado de tiendas', type: [Store] })
  @ApiResponse({ status: 404, description: 'No se encontraron tiendas' })
  async findAllStores() {
    return await this.storesService.findAllStores();
  }

  @ApiOperation({ summary: 'Obtener una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda encontrada', type: Store })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  @UseGuards(AuthGuard, RolesGuard)
  @Get('stores/:id')
  async findOneById(@Param('id') id: string) {
    return await this.storesService.findOneById(id);
  }

  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('stores/:id/status')
  @ApiOperation({ summary: 'Actualizar el estado de una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda actualizada exitosamente', type: Store })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  async updateStatusStore(@Param('id') id: string, @Body() updateStatusStoreDto: UpdateStatusStoreDto) {
    return await this.storesService.updateStatusStore(id, updateStatusStoreDto);
  }

  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('stores/:id')
  @ApiOperation({ summary: 'Actualizar una tienda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda actualizada exitosamente', type: Store })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
  async updateStore(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return await this.storesService.updateStore(id, updateStoreDto);
  }

    //                                                  //
    // -------------------- CONFIG -------------------- //
    //                                                  // 

  @ApiOperation({
    summary: 'Obtener configuración publica según dominio'
  })
  @Get('storefront')
  async getStoreConfig(
    @Req() req: any
  ) {
    const { domain } = req.store
    return await this.storesService.getPublicStoreConfiguration(domain)
  }

  @ApiOperation({
    summary: 'Obtener configuración publica según dominio'
  })
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Put('stores/:storeId/config')
  async updateStoreConfig(
    @Param('storeId') storeId: string,
    @Req() req: Request,
    @Body() configuration /*CreateStoreConfigurationDto */
  ) {
    return await this.storesService.updateStoreConfiguration(storeId, configuration)
  }
}

