import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductRepository } from './product.repository';
import { CategoryModule } from '../categories/category.module';
import { ProductVariantRepository } from './product-variant.repository';
import { ProductCategoryRepository } from './product-category,repository';
import { StoresModule } from 'src/modules/_platform/stores/stores.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Product,
    ProductVariant,
    ProductCategory,
  ]),
    StoresModule, 
    CategoryModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    ProductVariantRepository,
    ProductCategoryRepository
  ],
  exports: [ProductService]
})
export class ProductModule {}
