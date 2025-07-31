import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlatformUsersService } from './platform-users.service';
import { UpdatePlatformUserDto } from './dto/update-platform-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles/roles.decorators';
import { CurrentStore } from 'src/common/decorators/store/store.decorator';
import { Store } from '../stores/entities/store.entity';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@ApiTags('platform-users (Dueño)')
@UseGuards(AuthGuard, RolesGuard)
@Roles('platform')
@Controller('platform-users')
export class PlatformUsersController {
  constructor(private readonly platformUsersService: PlatformUsersService) {}

  @Get()
  @Roles('platform')
  @ApiOperation({ summary: 'Obtener todos admins' })
  @ApiResponse({ status: 200, description: 'Lista de admins' })
  async findAllPlatformUsers(@CurrentStore() store: Store) {
    return await this.platformUsersService.findAllPlatformUsers(store.id);
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
