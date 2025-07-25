import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [ProductModule, CategoryModule]
})
export class InventoryModule {}
