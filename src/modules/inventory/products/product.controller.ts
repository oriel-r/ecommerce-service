import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { StoreByIdPipe } from 'src/modules/_platform/stores/pipes/store-by-id/store-by-id.pipe';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { ApiWrappedResponse } from 'src/common/decorators/api-wrapped-response/api-wrapped-response.decorator';
import { Product } from './entities/product.entity';
import { createPaginatedResponseDto } from 'src/common/dtos/api-response-paginated.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AssignProductCategoryDto } from './dto/assign-product-category.dto';

@Controller('stores/:storeId/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @ApiOperation({
    description: 'Create new product'
  })
  @ApiWrappedResponse(Product)
  @Post()
  async create(
    @Param('storeId', StoreByIdPipe ) store: Store,
    @Body() data: CreateProductDto
  ) {
    return await this.productService.create(store, data)
  }

  @ApiOperation({
    description: 'Create new product'
  })
  @ApiWrappedResponse(Product)
  @Post(':id/categories')
  async assignCategoryToProdut(
    @Param('storeId') store: string,
    @Param('id') productId: string,
    @Body() data: AssignProductCategoryDto
  ) {
    return await this.productService.assignCategoryToProduct(data, productId, store)
  }

    @ApiOperation({
    description: 'Replace all categories assigned to a product'
  })
  @ApiWrappedResponse(Product)
  @Put(':id/categories')
  async syncProductsCategories(
    @Param('storeId') store: string,
    @Param('id') productId: string,
    @Body() data: AssignProductCategoryDto
  ) {
    return await this.productService.syncProductCategories(data, productId, store)
  }

  @ApiOperation({
    description: 'get products array by store id, and filter'
  })
  @ApiResponse({
    status: HttpStatus.OK, type: createPaginatedResponseDto(Product)
  })
  @Get()
  async get(@Param('id') store: string) {
    return await this.productService.get(store)
  }

  @ApiOperation({
    description: 'get a product By Id'
  })
  @ApiWrappedResponse(Product)
  @Get(':id')
  async getById(
    @Param('storeId') store: string,
    @Param('id') id: string
  ) {
    return await this.productService.getById(store, id)
  }

  @ApiOperation({
    description: 'edit a product'
  })
  @ApiWrappedResponse(Product)
  @Patch(':id')
  async patch(
    @Param('storeId') store: string,
    @Param('id') id: string,
    @Body() data: UpdateProductDto
  ) {
    return await this.productService.update(store, id, data)
  }

  @ApiOperation({
    description: 'soft delete product'
  })
  @Delete(':id')
  async softDelete(
    @Param('storeId') store: string,
    @Param('id') id: string
  ) {
    return await this.productService.softDelte(store, id)
  }

  @ApiOperation({
    description: 'delete product'
  })
  @Delete(':id/force')
  async delete(
    @Param('storeId') store: string,
    @Param('id') id: string
  ) {
    return await this.productService.delete(store, id)
  }

  @ApiOperation({
    description: 'delete product category'
  })
  @Delete(':id/categories')
  async deleteProductCategory(
    @Param('storeId') store: string,
    @Param('id') id: string,
    @Body() categoriesIds: AssignProductCategoryDto
  ) {
    return await this.productService.deleteProductCategory(store, id, categoriesIds.categoriesIds)
  }


}
