import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductVariant } from "./entities/product-variant.entity";

export class ProductVariantRepository {
    constructor(
        @InjectRepository(ProductVariant) private readonly productVariantRepository: Repository<ProductVariant>
    ) {}

    async create(data: Partial<ProductVariant>) {
        const newproduct = await this.productVariantRepository.save(
            this.productVariantRepository.create(data)
        )
        return newproduct
    }

    async find(storeId: string) {
        const productVariants = await this.productVariantRepository.find()
        return productVariants
    }

    async findById(storeId: string, id: string) {
        const productVariant = await this.productVariantRepository.findOne({
            where: {id},
        })
        return productVariant
    }

    async update(storeId: string, id: string, data: Partial<ProductVariant>) {
        return await this.productVariantRepository.update(id, data)
    
    }

    async save(data: ProductVariant) {
        return await this.productVariantRepository.save(data)
    }
    
    async softDelete(storeId: string, id: string) {
        return await this.productVariantRepository.softDelete(id)
    }

    async delete (storeId: string, id: string) {
        return await this.productVariantRepository.delete(id)
    }
}