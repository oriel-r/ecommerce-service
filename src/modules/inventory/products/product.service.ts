import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { hasSameValues } from 'src/common/utils/has-same-values.util';
import { NothingToUpdateException } from 'src/common/exeptions/nothing-to-update.exception';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity'
import { ProductVariantRepository } from './product-variant.repository';
import { ProductCategoryRepository } from './product-category,repository';
import { CategoryService } from '../categories/category.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource, DeepPartial, UpdateResult } from 'typeorm';
import { AssignProductCategoryDto } from './dto/assign-product-category.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-variant.dto';

@Injectable()
export class ProductService {

    private readonly logger = new Logger('ProductService')

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productVariantRepository: ProductVariantRepository,
        private readonly productCategoryRepository: ProductCategoryRepository,
        private readonly categoriesService: CategoryService
    ) {}

    async create(store: Store, data: CreateProductDto) {

        const { name, ...otherData } = data;

        const existName = await this.productRepository.findOneByName(store.id, name);;


        if (existName) {
            throw new UnprocessableEntityException(`El producto ${name} ya existe`);
        } 

        const newProduct = await this.productRepository.create({
            ...otherData,
            name,
            store
        });

        if (!newProduct) {
            throw new InternalServerErrorException('Hubo un fallo al crear el producto');
        }

        return newProduct;
                                                                        
    }

    async get(storeId: string) {
        const products = await this.productRepository.findByStore(storeId)
        return products
    }

    async getById(storeId: string, id: string) {
        const store = storeId
        const product = await this.productRepository.findById(store, id)
    
        if(!product) throw new NotFoundException('No se el producto')
            return product
    }

    async update(storeId: string, id: string, data: UpdateProductDto) {
        const store = storeId
        const {name} = data
        const product = await this.productRepository.findById(store, id)

        if(!product) throw new NotFoundException('Producto inexistente o ID erroneo')
    
        if(hasSameValues(data, product)) throw new NothingToUpdateException

        const updateData: DeepPartial<Product> = {}
        let alreadyExistName: Product | null = null

        if( name ) {
            alreadyExistName = await this.productRepository.findOneByName(storeId, name)     
        }

        if(alreadyExistName) throw new ConflictException(`Ya existe un producto llamado ${name}`)
        
        const updateResul = await this.productRepository.update(id, data)

        if(!updateResul) throw new InternalServerErrorException('Hubo un error desconocido al modificar la categoria')

        return this.getById(store, id)
    }

    async softDelte(storeId: string, id: string) {
        const store = storeId
        await this.getById(storeId, id)
        const softDeleteResult = await this.productRepository.softDelete(store, id)
        
        return softDeleteResult
    }

    async delete(storeId: string, id: string) {
        const store = storeId

        await this.getById(store, id)

        const deletResult = await this.productRepository.delete(store, id)
        return deletResult
    }

    //                                                  //
    // ------------------- CATEGORIES ----------------- //
    //                                                  // 

    async assignCategoryToProduct({categoriesIds}: AssignProductCategoryDto , productId: string, storeId: string) {
        
        const [productExists, categoriesExist] = await Promise.all([
            this.productRepository.exists(storeId, productId),
            this.categoriesService.validateIdsExist(categoriesIds, storeId),
        ]);

        if (!productExists) {
            throw new UnprocessableEntityException(`El producto con ID '${productId}' no fue encontrado.`);
        }
        if (!categoriesExist) {
            throw new UnprocessableEntityException('Una o más de las categorías proporcionadas no son válidas.');
        }

        const existingCategoryIds = await this.productCategoryRepository.findExistingCategoryIds(
            productId,
            categoriesIds,
        );
        
        const categoryIdsToCreate = categoriesIds.filter(
            id => !existingCategoryIds.includes(id)
        );
        
        if (categoryIdsToCreate.length === 0) {
        return {
            assignedCount: 0,
            alreadyExistedCount: categoriesIds.length
            };
        }

        const newAssignments = categoryIdsToCreate.map(categoryId => ({
            productId,
            categoryId,
        }));

        await this.productCategoryRepository.createBulk(newAssignments);

        return {
            assignedCount: newAssignments.length,
            alreadyExistedCount: existingCategoryIds.length
        };
    }

    async syncProductCategories (data: AssignProductCategoryDto, productId: string, storeId: string) {
        const { categoriesIds } = data;

        const [productExists, categoriesExist] = await Promise.all([
            this.productRepository.exists(storeId, productId), 
            this.categoriesService.validateIdsExist(categoriesIds, storeId)
        ]);

        this.logger.debug(productExists)

        if (!productExists) {
            throw new UnprocessableEntityException(`El producto con ID '${productId}' no fue encontrado en esta tienda.`);
        }

        if (!categoriesExist) {
            throw new UnprocessableEntityException('Una o más de las categorías proporcionadas no son válidas para esta tienda.');
        }

        const newAssignments = categoriesIds.map(categoryId => ({
            productId,
            categoryId,
            storeId,
        }));

        try {
         await this.productCategoryRepository.syncCategoriesInTransaction(newAssignments);
        } catch (error) {
        throw new InternalServerErrorException('No se pudo completar la sincronización de categorías.');
        }

        return { assignedCount: newAssignments.length };
    }

    async deleteProductCategory (storeId: string, productId: string, categoriesIds: string[]) {
        const productCategory = await this.productCategoryRepository.findById(storeId, productId, categoriesIds)

        if(!productCategory) throw new NotFoundException('Produto o categorias inexistentes')

        const results = await Promise.all(
            categoriesIds.map(id => this.productCategoryRepository.delete(storeId, productId, id))
        )

        return results
    }

    //                                                  //
    // ------------------- VARIANTS ------------------- //
    //                                                  //

    async createProductVariant(storeId: string, productId: string, data: CreateProductVariantDto) {
        const product = await this.productRepository.findById(storeId, productId)

        if(!product) throw new UnprocessableEntityException(`El producto con el ID ${productId} no existe`)

        if(data.isDefault) {
            await this.productVariantRepository.unsetCurrentDefault(productId)
        }

        const newProductVariant = await this.productVariantRepository.create(
            {
                ...data,
                product 
            })
        
        if(!newProductVariant) throw new InternalServerErrorException('Hubo un error inesperado al crear la variante')
        
        return await this.productRepository.findById(storeId, productId)
    }

    async deleteProductVariant ( sotreId: string, productId: string, variantId: string) {
        const exist = this.productVariantRepository.exist(sotreId, productId, variantId)

        if(!exist) throw new NotFoundException('No se encontro la variante')

        return await this.productVariantRepository.delete(variantId)
    }

    async getVariantByIdAndStoreId(storeId: string, productVariantId: string) {
        const variant = await this.productVariantRepository.findByStoreId(storeId, productVariantId)
        return variant
    }

    async updateProductVariant (storeId: string, productId: string, variantId: string, data: UpdateProductVariantDto) {
        const exist = await this.productVariantRepository.exist(storeId, productId, variantId)
        
        if(!exist) throw new NotFoundException('No se encontro la variante')

        let result: UpdateResult | null = null 

        if(data.isDefault) {
            result = await this.productVariantRepository.setDefaultVariantInTransaction(productId, variantId, data)
        } else {
            result = await this.productVariantRepository.update(variantId, data)
        }

        if(!result || !result.affected) throw new InternalServerErrorException('Hubo un error al actualizar la variante')

        return await this.productRepository.findById(storeId, productId)
    }

    async getProductVariantsByProductId () {
        return
    }

    //                                                  //
    // ---------------------- AUX --------------------- //
    //                                                  //

    private async getProductOrFail(storeid: string, productId: string) {
        const product = await this.productRepository.findByIdOrFail(storeid, productId)

        if(!product) {
            throw new NotFoundException('Producto no encontrado')
        }

        return product
    }

}
