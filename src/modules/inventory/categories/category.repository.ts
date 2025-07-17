import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

export class CategoryRepository {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) {}

    async create(data: Partial<Category>) {
        const newCategory = await this.categoryRepository.save(
            this.categoryRepository.create(data)
        )
        return newCategory
    }

    async findByStore(storeId: string) {
        const categories = await this.categoryRepository.find({
            where: {storeId}
        })
        return categories
    }

    async findById(storeId: string, id: string) {
        const category = await this.categoryRepository.findOne({
            where: {id},
            relations: {children: true, parent: true}
        })
        return category
    }

    async findOneByName (store: string, name: string) {
        const category = await this.categoryRepository.findOneBy({name})
        return category
    }

    async update(storeId: string, id: string, data: Partial<Category>) {
        return await this.categoryRepository.update(id, data)
    
    }

    async save(data: Category) {
        return await this.categoryRepository.save(data)
    }
    
    async softDelete(storeId: string, id: string) {
        return await this.categoryRepository.softDelete(id)
    }

    async delete (storeId: string, id: string) {
        return await this.categoryRepository.delete(id)
    }
}