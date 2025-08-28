import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { StoreByIdPipe } from 'src/modules/_platform/stores/pipes/store-by-id/store-by-id.pipe';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { ApiWrappedResponse } from 'src/common/decorators/api-wrapped-response/api-wrapped-response.decorator';
import { Product } from './entities/product.entity';
import { createPaginatedResponseDto } from 'src/common/dtos/api-response-paginated.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AssignProductCategoryDto } from './dto/assign-product-category.dto';
import { plainToInstance } from 'class-transformer';
import { ProductArrayResponseDto } from './dto/product-array-response.dto';
import { ProductReponseDto } from './dto/product-reponse.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Role } from 'src/modules/auth/roles/entities/role.entity';
import { Roles } from 'src/common/decorators/roles/roles.decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesPipe } from 'src/common/pipes/files/files.pipe';
import { DeleteVariantImage } from './dto/delete-variant-image.dto';

@Controller('stores/:storeId/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //                                                  //
  // ------------------- PRODUCT -------------------- //
  //                                                  //

  @ApiOperation({
    description: 'Create new product'
  })
  @ApiWrappedResponse(Product)
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Param('storeId', StoreByIdPipe ) store: Store,
    @Body() data: CreateProductDto
  ) {
    return await this.productService.create(store, data)
  }

  @ApiOperation({
    description: 'get products array by store id, and filter'
  })
  @ApiResponse({
    status: HttpStatus.OK, type: createPaginatedResponseDto(Product)
  })
  @Get()
  async get(@Param('storeId') store: string) {
    const products = await this.productService.get(store)
    const productsToSend = products.map(product => new ProductArrayResponseDto(product))
    return productsToSend
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
    const product = await this.productService.getById(store, id)
    return new ProductReponseDto(product)
  }

  @ApiOperation({
    description: 'edit a product'
  })
  @ApiWrappedResponse(Product)
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
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
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
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
  @Roles('platform')  
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id/force')
  async delete(
    @Param('storeId') store: string,
    @Param('id') id: string
  ) {
    return await this.productService.delete(store, id)
  }

  //                                                  //
  // ------------------- CATEGORY ------------------- //
  //                                                  //

  @ApiOperation({
    description: 'assign categories to a product'
  })
  @ApiWrappedResponse(Product)
  @Roles('platform') 
  @UseGuards(AuthGuard, RolesGuard)
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
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id/categories')
  async syncProductsCategories(
    @Param('storeId') store: string,
    @Param('id') productId: string,
    @Body() data: AssignProductCategoryDto
  ) {
    return await this.productService.syncProductCategories(data, productId, store)
  }

  @ApiOperation({
    description: 'delete product category'
  })
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id/categories')
  async deleteProductCategory(
    @Param('storeId') store: string,
    @Param('id') id: string,
    @Body() categoriesIds: AssignProductCategoryDto
  ) {
    return await this.productService.deleteProductCategory(store, id, categoriesIds.categoriesIds)
  }

  //                                                  //
  // ------------------- VARIANTS ------------------- //
  //                                                  //

  @ApiOperation({
    description: 'create a product variant'
  })
  @ApiResponse({})
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Post(':productId/variants')
  async createProductVaraint(
    @Param('storeId') storeId: string,
    @Param('productId') productId: string,
    @Body() data: CreateProductVariantDto
  ) {
    const productWithNewVariant = await this.productService.createProductVariant(storeId, productId, data)
    return new ProductReponseDto(productWithNewVariant!)
  }


  @ApiOperation({ summary: 'Subir un archivo al bucket' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a subir',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
        required: ['file'],
      },
    })
    @ApiResponse({
      status: 201,
      description: 'Archivo subido correctamente',
      schema: {
        type: 'object',
        properties: {
          url: { type: 'string', example: 'https://storage.googleapis.com/mi-bucket/archivo.jpg' },
        },
      },
    })
  @Post(':productId/variants/:variantId/images')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @Param('storeId') storeId: string,
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @UploadedFiles(new FilesPipe(0, 20000000,  ['image/png', 'image/jpeg', 'image/webp'])) files: Express.Multer.File[] ) {
      console.log({
        storeId,
        productId,
        variantId,
        files: files.length
      })
      const productVariant = await this.productService.uploadVarintImages(storeId, productId, variantId,files);
      return productVariant    
  }
  
  @ApiOperation({
    summary: 'Eliminar una imagen por su url'
  })
  @Delete(':productId/variants/:variantId/images')
  @UseInterceptors(FilesInterceptor('files'))
  async deleteImage(
    @Param('storeId') storeId: string,
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body() image: DeleteVariantImage) {
      const productVariant = await this.productService.deleteVariantImage(storeId, productId, variantId, image);
      return productVariant    
  }


  @ApiOperation({
      description: 'edit product variant'
  })
  @ApiResponse({})
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':productId/variants/:id')
  async editVariant(
    @Param('storeId') storeId: string,
    @Param('productId') productId: string,
    @Param('id') variantId: string,
    @Body() data: CreateProductVariantDto
  ) {
    return await this.productService.updateProductVariant(storeId, productId, variantId, data)
  }

  @ApiOperation({})
  @ApiResponse({})
  @Roles('platform')
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':productId/variants/:id')
  async deleteProductVariant(
    @Param('storeId') storeId: string,
    @Param('productId') productId: string,
    @Param('id') vairnatId: string,
    @Body() data: CreateProductVariantDto
  ) {
    return await this.productService.deleteProductVariant(storeId, productId, vairnatId)
  }


}
