import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { hasSameValues } from 'src/common/utils/has-same-values.util';
import { NothingToUpdateException } from 'src/common/exeptions/nothing-to-update.exception';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity'
import { ProductVariantRepository } from './product-variant.repository';
import { ProductCategoryRepository } from './product-category,repository';
import { CategoryService } from '../categories/category.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ProductService {

    private readonly logger = new Logger('ProductService')

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productVariantRepository: ProductVariantRepository,
        private readonly productCategoryRepository: ProductCategoryRepository,
        private readonly categoriesService: CategoryService
    ) {}

    async create(storeId: string, data: CreateProductDto) {
        const store = storeId

        const { name } = data;

        const existName = await this.productRepository.findOneByName(storeId, name);;


        if (existName) {
            throw new UnprocessableEntityException(`El producto ${name} ya existe`);
        } 

        const newProduct = await this.productRepository.create(storeId, {
            name,
        });

        if (!newProduct) {
            throw new InternalServerErrorException('Hubo un fallo al crear el producto');
        }

        return newProduct;
                                                                        
    }

    async get(storeId: string) {
        const store = storeId

        const products = await this.productRepository.find(storeId)
        
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
        
        const updateResul = await this.productRepository.update(storeId, id, data)

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
    
    async assignCategoryToProduct() {
        return
    }

    async syncProductCategories () {
        return
    }
    

    async removeProductCategory () {
        return
    }

    async createProductVariant () {
        return
    }

    async deleteProductVariant () {
        return
    }

    async updateProductVariant () {
        return
    }

    async getProductVariantsByProductId () {
        return
    }


}
