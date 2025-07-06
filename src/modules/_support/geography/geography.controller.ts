import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeographyService } from './geography.service';
import { CreateGeographyDto } from './dto/create-geography.dto';
import { UpdateGeographyDto } from './dto/update-geography.dto';

@Controller('geography')
export class GeographyController {
  constructor(private readonly geographyService: GeographyService) {}

  @Post()
  create(@Body() createGeographyDto: CreateGeographyDto) {
    return this.geographyService.create(createGeographyDto);
  }

  @Get()
  findAll() {
    return this.geographyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geographyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeographyDto: UpdateGeographyDto) {
    return this.geographyService.update(+id, updateGeographyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geographyService.remove(+id);
  }
}
