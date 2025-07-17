import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductCategory } from "./entities/product-category.entity";

export class ProductCategoryRepository {
    constructor(
        @InjectRepository(ProductCategory) private readonly productCategoryRepository: Repository<ProductCategory>
    ) {}

    async create(store: string, data) {
        const newproduct = await this.productCategoryRepository.save(
            this.productCategoryRepository.create(data)
        )
        return newproduct
    }

    async find(storeId: string) {
        const ProductCategorys = await this.productCategoryRepository.find()
        return ProductCategorys
    }

    async findById(storeId: string, productId: string, categoryId: string) {
        const ProductCategory = await this.productCategoryRepository.findOne({
            where: {productId, categoryId}
        })
        return ProductCategory
    }

    async update(storeId: string, id: string, data: Partial<ProductCategory>) {
        return await this.productCategoryRepository.update(id, data)
    
    }

    async save(data: ProductCategory) {
        return await this.productCategoryRepository.save(data)
    }
    
    async softDelete(storeId: string, id: string) {
        return await this.productCategoryRepository.softDelete(id)
    }

    async delete (storeId: string, id: string) {
        return await this.productCategoryRepository.delete(id)
    }
}