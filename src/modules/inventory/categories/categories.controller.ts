import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Request } from 'express';

@Controller('stores/:storeId/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create() {
    return 
  }
  
  @Get()
  async get(@Req() req: Request) {
    return {message: "This is a request in ctegories from" , paramas: req.params}
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
