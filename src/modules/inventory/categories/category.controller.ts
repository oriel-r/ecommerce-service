import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ApiWrappedResponse } from 'src/common/decorators/api-wrapped-response/api-wrapped-response.decorator';
import { Category } from './entities/category.entity';
import { StoreByIdPipe } from '../../_platform/stores/pipes/store-by-id/store-by-id.pipe';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { createPaginatedResponseDto } from 'src/common/dtos/api-response-paginated.dto';
import { CategoryTreeResponseDto } from './dto/category-array-responde.dto';

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
    @Param('storeId', StoreByIdPipe) store: Store,
    @Body() data: CreateCategoryDto
  ) {
    return await this.categoryService.create(store, data) 
  }
  
  @ApiOperation({
    summary: 'return categories array'
  })
  @ApiResponse({
    status: HttpStatus.OK, type: createPaginatedResponseDto(Category)
  })
  @Get()
  async get(
    @Param('storeId') storeId: string
  ) {
    const categoriesRawTree = await this.categoryService.get(storeId)
    return categoriesRawTree.map(parent => new CategoryTreeResponseDto(parent))
  }

  @ApiOperation({
    summary: 'Return a category'
  })
  @ApiWrappedResponse(Category)
  @Get(':id')
  async getById(
    @Param('storeId') sotreId,
    @Param('id') id: string
  ) {
    return await this.categoryService.getById(sotreId, id)
  }

  @ApiOperation({
    summary: 'change name of category or children and parent'
  })
  @ApiWrappedResponse(Category)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, type: undefined
  })
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
