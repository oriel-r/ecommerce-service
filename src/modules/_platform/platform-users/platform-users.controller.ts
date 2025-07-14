import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatformUsersService } from './platform-users.service';
import { UpdatePlatformUserDto } from './dto/update-platform-user.dto';
import { CreatePlatformUserWithStoreDto } from './dto/create-platform-user-with-store.dto';
import { CurrentStore } from 'src/common/decorators/store/store.decorator';
import { Store } from '../stores/entities/store.entity';

@Controller('platform-users')
export class PlatformUsersController {
  constructor(private readonly platformUsersService: PlatformUsersService) {}

  @Post()
  async create(@Body() dto: CreatePlatformUserWithStoreDto) {
    return await this.platformUsersService.create(dto);
  }

  @Get()
  findAll() {
    return this.platformUsersService.findAll();
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
