import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { ProductCategory } from "./entities/product-category.entity";

export class ProductCategoryRepository {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(ProductCategory) private readonly productCategoryRepository: Repository<ProductCategory>
    ) {}

    private getRepository(manager?: EntityManager): Repository<ProductCategory> {
        return manager ? manager.getRepository(ProductCategory) : this.dataSource.getRepository(ProductCategory);
    }

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

    async findById(storeId: string, productId: string, categoriesIds: string[]) {
        const ProductCategory = await this.productCategoryRepository.findOne({
            where: {
                productId,
                categoryId: In(categoriesIds)
            }
        })
        return ProductCategory
    }

    async update(storeId: string, id: string, data: Partial<ProductCategory>) {
        return await this.productCategoryRepository.update(id, data)
    
    }

    async findExistingCategoryIds(productId: string, categoryIds: string[]): Promise<string[]> {
    
        if (categoryIds.length === 0) {
          return [];
        }
    
        const existingAssignments = await this.productCategoryRepository.find({
            select: ['categoryId'],
            where: {
                productId: productId,
                categoryId: In(categoryIds),
            },
        });

        return existingAssignments.map(a => a.categoryId);
    }

    async createBulk(assignments: { productId: string; categoryId: string }[]): Promise<void> {
        if (assignments.length === 0) return
        
        await this.productCategoryRepository.insert(assignments);
    }

    async deleteByProductId(productId: string, manager: EntityManager): Promise<void> {
        await this.getRepository(manager).delete({ productId });
    }

    async syncCategoriesInTransaction(
        assignmentsToCreate: { productId: string; categoryId: string; storeId: string }[],
    ): Promise<void> {

        const productId = assignmentsToCreate[0]?.productId;
        if (!productId) return; 
        await this.dataSource.transaction(async (transactionalEntityManager) => {

        await this.deleteByProductId(productId, transactionalEntityManager);

        if (assignmentsToCreate.length > 0) {
         await transactionalEntityManager.insert(ProductCategory, assignmentsToCreate);
         }
    });
    }

    async save(data: ProductCategory) {
        return await this.productCategoryRepository.save(data)
    }
    
    async softDelete(storeId: string, id: string) {
        return await this.productCategoryRepository.softDelete(id)
    }

    async delete (storeId: string, productId: string, categoryId: string, manager?: EntityManager) {
        const productCategoryRepository = manager ? manager.getRepository(ProductCategory) : this.productCategoryRepository
        return await this.productCategoryRepository.delete({
            productId,
            categoryId
        })
    }

}