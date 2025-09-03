import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, Repository, UpdateResult } from "typeorm";
import { ProductVariant } from "./entities/product-variant.entity";

export class ProductVariantRepository {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
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

    async exist(storeId: string, productId: string, variantId: string) {
        const count = await this.productVariantRepository.count({
            where: {
                id: variantId,
                product: {
                    id: productId,
                    storeId: storeId
                }
            }
        
        })

        return count > 0
    }

    async findById(product: string, id: string) {
        const productVariant = await this.productVariantRepository.findOne({
            where: {
                id,
                product: {id: product}
            }
        })
        return productVariant
    }

    async findByStoreId(storeId: string, id: string) {
        const productVariant = await this.productVariantRepository.findOne({
            where: {
                id,
                product: {storeId}
            }
        })
        return productVariant
    }

    async findByStoreIdWhereStoreAndProduct(storeId: string, produtId: string, variantId: string) {
        const productVariant = await this.productVariantRepository.findOne({
            where: {
                id: variantId,
                product: {id: produtId, storeId}
            }
        })
        return productVariant
    }

    async update( id: string, data ) {
        return await this.productVariantRepository.update(id, data)
    }

    async setDefaultVariantInTransaction(
    productId: string,
    variantId: string,
    updateDto,
  ): Promise<UpdateResult> {
    return this.dataSource.transaction(async (manager) => {
      await this.unsetCurrentDefault(productId, manager);
      
      const updateResult = await this.getRepository(manager).update(
        { id: variantId, product: { id: productId } },
        updateDto,
      );

      return updateResult
    });
  }


    async unsetCurrentDefault(productId: string, manager?: EntityManager) {
        return await this.getRepository(manager).update(
            {
                product: {id: productId},
                isDefault: true
            }, 
            {
                isDefault: false
            }
        )
    }

    async save(data: ProductVariant) {
        return await this.productVariantRepository.save(data)
    }
    
    async softDelete(storeId: string, id: string) {
        return await this.productVariantRepository.softDelete(id)
    }

    async delete (id: string) {
        return await this.productVariantRepository.delete(id)
    }

    private getRepository(manager?: EntityManager) {
        return manager
        ? manager.getRepository(ProductVariant)
        : this.productVariantRepository
    }
}