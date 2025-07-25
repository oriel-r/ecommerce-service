import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, Repository } from "typeorm";
import { Product } from "./entities/product.entity";

export class ProductRepository {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {}

    async create(data: Partial<Product>) {
        const newproduct = await this.productRepository.save(
            this.productRepository.create(data)
        )
        return newproduct
    }

    async find(storeId: string) {
        const products = await this.productRepository.find({
            where: {
                store: {id: storeId}
            },
            relations: {store: false}
        })
        return products
    }

    async findById(storeId: string, id: string) {
        const product = await this.productRepository.findOne({
            where: {
                id,
                store: {id: storeId}
            },
            relations: { categoryAssignments: true , variants: true}
        })
        return product
    }

    async findOneByName (storeId: string, name: string) {
        const product = await this.productRepository.findOne({
            where: {
                name,
                store: {id: storeId}
            }
        })
        return product
    }

    async findByIdOrFail(storeId: string, id: string) {
        return await this.productRepository.findOneByOrFail({id})
    }

    async update( id: string, data: Partial<Product>) {
        return await this.productRepository.update(id, data)
    
    }

    async save(data: Product) {
        return await this.productRepository.save(data)
    }
    
    async softDelete(storeId: string, id: string) {
        return await this.productRepository.softDelete(id)
    }

    async exists(storeId: string, productId : string, manager?: EntityManager): Promise<boolean> {
        const productRepository = manager ? manager.getRepository(Product) : this.productRepository

        const count = await this.productRepository.countBy({ id: productId });
        
        return count > 0;
    }

    async delete (storeId: string, id: string) {
        return await this.productRepository.delete(id)
    }
}