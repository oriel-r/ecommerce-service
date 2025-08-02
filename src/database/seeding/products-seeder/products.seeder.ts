import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { Category } from 'src/modules/inventory/categories/entities/category.entity';
import { Product } from 'src/modules/inventory/products/entities/product.entity';
import { ProductVariant } from 'src/modules/inventory/products/entities/product-variant.entity';
import { ProductCategory } from 'src/modules/inventory/products/entities/product-category.entity';
import { defaultStoreMock, productsMock } from '../mocks'; // Ajusta la ruta a tu archivo de mocks
import { appDataSource } from 'src/database/data-source';

@Injectable()
export class ProductsSeeder {
    private readonly logger = new Logger(ProductsSeeder.name);
    private readonly dataSource: DataSource;

    constructor() {
        this.dataSource = appDataSource;
    }

    async run() {
        this.logger.log('Iniciando el seeder de Productos...');

        // Obtenemos todos los repositorios que vamos a necesitar
        const storeRepository = this.dataSource.getRepository(Store);
        const categoryRepository = this.dataSource.getRepository(Category);
        const productRepository = this.dataSource.getRepository(Product);
        const productCategoryRepository = this.dataSource.getRepository(ProductCategory);

        const defaultStore = await storeRepository.findOneBy({ domain: defaultStoreMock.domain });

        if (!defaultStore) {
            this.logger.error(`Error crítico: La tienda por defecto con dominio '${defaultStoreMock.domain}' no fue encontrada. Se omite el seeding de productos.`);
            return;
        }

        for (const productMock of productsMock) {
            
            const productExists = await productRepository.findOneBy({
                name: productMock.name,
                store: { id: defaultStore.id },
            });

            if (productExists) {
                this.logger.log(`El producto '${productMock.name}' ya existe. Omitiendo.`);
                continue; // Pasar al siguiente producto del mock
            }

            this.logger.log(`Procesando producto: '${productMock.name}'...`);

            const categoriesToAssign: Category[] = [];
            for (const categoryName of productMock.categories) {
                const category = await categoryRepository.findOneBy({ name: categoryName, store: { id: defaultStore.id } });
                if (category) {
                    categoriesToAssign.push(category);
                } else {
                    this.logger.warn(`La categoría '${categoryName}' no fue encontrada para el producto '${productMock.name}'. Será omitida.`);
                }
            }

            const { variants: variantsMock, ...productData } = productMock;

            const variantsToCreate = variantsMock.map(variantMock => {
                const variant = new ProductVariant();
                Object.assign(variant, variantMock);
                return variant;
            });
            
            const productToCreate = productRepository.create({
                ...productData,
                store: defaultStore,
                variants: variantsToCreate, // TypeORM se encargará de esto gracias a la relación
            });

            try {
                const savedProduct = await productRepository.save(productToCreate);
                this.logger.log(`Producto '${savedProduct.name}' y sus ${savedProduct.variants.length} variantes creados exitosamente.`);

                if (categoriesToAssign.length > 0) {
                    const categoryAssignments = categoriesToAssign.map(category => 
                        productCategoryRepository.create({
                            productId: savedProduct.id,
                            categoryId: category.id,
                        })
                    );
                    await productCategoryRepository.save(categoryAssignments);
                    this.logger.log(`Asignadas ${categoryAssignments.length} categorías a '${savedProduct.name}'.`);
                }

            } catch (error) {
                this.logger.error(`Falló la creación del producto '${productMock.name}'.`, error.stack);
            }
        }

        this.logger.log('Seeding de productos completado.');
    }
}