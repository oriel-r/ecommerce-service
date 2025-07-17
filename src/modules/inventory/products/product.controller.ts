import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('stores/:storeId/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({})
  @ApiResponse({})
  @Post()
  async create() {
    return 
  }

  @ApiOperation({})
  @ApiResponse({})
  @Get()
  async get(@Req() req: Request) {
    return {message: "This is a request from" , paramas: req.params}
  }

  @ApiOperation({})
  @ApiResponse({})
  @Get()
  async getById() {

  }

  @ApiOperation({})
  @ApiResponse({})
  @Patch()
  async patch() {

  }

  @ApiOperation({})
  @ApiResponse({})
  @Delete()
  async delete() {

  }

}
