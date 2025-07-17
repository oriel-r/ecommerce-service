import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";

export class ProductRepository {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {}

    async create(store: string, data) {
        const newproduct = await this.productRepository.save(
            this.productRepository.create(data)
        )
        return newproduct
    }

    async find(storeId: string) {
        const products = await this.productRepository.find()
        return products
    }

    async findById(storeId: string, id: string) {
        const product = await this.productRepository.findOne({
            where: {id},
        })
        return product
    }

    async findOneByName (store: string, name: string) {
        const product = await this.productRepository.findOneBy({name})
        return product
    }

    async update(storeId: string, id: string, data: Partial<Product>) {
        return await this.productRepository.update(id, data)
    
    }

    async save(data: Product) {
        return await this.productRepository.save(data)
    }
    
    async softDelete(storeId: string, id: string) {
        return await this.productRepository.softDelete(id)
    }

    async delete (storeId: string, id: string) {
        return await this.productRepository.delete(id)
    }
}