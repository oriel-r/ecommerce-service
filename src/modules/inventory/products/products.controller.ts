import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Request } from 'express';

@Controller('stores/:storeId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create() {
    return 
  }
  
  @Get()
  async get(@Req() req: Request) {
    return {message: "This is a request from" , paramas: req.params}
  }

  @Get()
  async getById() {

  }

  @Patch()
  async patch() {

  }

  @Delete()
  async delete() {

  }

}
