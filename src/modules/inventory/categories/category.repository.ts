import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { EntityManager, In, Repository } from "typeorm";

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

    async findCategoryTreeByStore(storeId: string): Promise<Category[]> {
        const qb = this.categoryRepository.createQueryBuilder('category');

        qb.where('category.store = :storeId', { storeId })
        .andWhere('category.parentId IS NULL')
        .leftJoinAndSelect('category.children', 'child')
        .orderBy('category.name', 'ASC')
        .addOrderBy('child.name', 'ASC');

        return qb.getMany();
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

    async validateIdsExist(categoryIds: string[], storeId?: string, manager?: EntityManager): Promise<boolean> {
        const categoryRepository = manager ? manager.getRepository(Category) : this.categoryRepository
        
        if (categoryIds.length === 0) return true
        
        const count = await this.categoryRepository.count({ where: { id: In(categoryIds) , store: {id: storeId}} });
            
        return count === categoryIds.length;
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