import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ApiWrappedResponse } from 'src/common/decorators/api-wrapped-response/api-wrapped-response.decorator';
import { Category } from './entities/category.entity';

@Controller('stores/:storeId/categories')
export class CategoriesController {
  private readonly store = 'seInstala'
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Create categories'
  })
  @ApiParam({
    name: 'storeId'
  })
  @ApiWrappedResponse(Category)
  @Post()
  async create(
    @Param('storeId') storeId,
    @Body() data: CreateCategoryDto
  ) {
    return await this.categoryService.create(storeId, data) 
  }
  
  @ApiOperation({
    summary: ''
  })
  @ApiResponse({})
  @Get()
  async get(
    @Param('storeId') storeId
  ) {
    return await this.categoryService.get(storeId)
  }

  @ApiOperation({
    summary: ''
  })
  @ApiResponse({})
  @Get(':id')
  async getById(
    @Param('storeId') sotreId,
    @Param('id') id: string
  ) {
    return await this.categoryService.getById(sotreId, id)
  }

  @ApiOperation({
    summary: ''
  })
  @ApiResponse({})
  @Patch(':id')
  async patch(
    @Param('storeId') storeId,
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto
  ) {
    return await this.categoryService.update(storeId, id, data)
  }

  @ApiOperation({
    summary: ''
  })
  @ApiResponse({})
  @Delete(':id/force')
  async hardDelete(
    @Param('storeId') storeId,
    @Param('id') id: string
  ) {
    return await this.categoryService.delete(storeId, id)
  }

  @ApiOperation({
    summary: ''
  })
  @ApiResponse({})
  @Delete(':id')
  async softDelete(
    @Param('storeId') storeId,
    @Param('id') id: string
  ) {
    return await this.categoryService.softDelte(storeId, id)
  }

  
}
