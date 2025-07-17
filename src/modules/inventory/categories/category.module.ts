import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { StoresModule } from 'src/modules/_platform/stores/stores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), StoresModule],
  controllers: [CategoriesController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService]
})
export class CategoryModule {}
