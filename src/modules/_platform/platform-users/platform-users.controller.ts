import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatformUsersService } from './platform-users.service';
import { UpdatePlatformUserDto } from './dto/update-platform-user.dto';
import { CreatePlatformUserWithStoreDto } from './dto/create-platform-user-with-store.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlatformUser } from './entities/platform-user.entity';

@ApiTags('platform-users (Dueño)')
@Controller('platform-users')
export class PlatformUsersController {
  constructor(private readonly platformUsersService: PlatformUsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un dueño de tienda' })
  @ApiResponse({ status: 201, description: 'Dueño creado exitosamente', type: PlatformUser })
  @ApiResponse({ status: 404, description: 'No se encontro el email indicado' })
  async create(@Body() dto: CreatePlatformUserWithStoreDto) {
    return await this.platformUsersService.create(dto);
  }

  @Get()
  findAllPlatformUsers() {
    return this.platformUsersService.findAllPlatformUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlatformUserDto: UpdatePlatformUserDto) {
    return this.platformUsersService.update(+id, updatePlatformUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platformUsersService.remove(+id);
  }
}
