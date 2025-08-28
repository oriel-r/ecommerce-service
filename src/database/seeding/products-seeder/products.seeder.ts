// Archivo: src/database/seeding/products.seeder.ts

import { Injectable, Logger } from '@nestjs/common'; // <-- Cambiado
import { DataSource, In } from 'typeorm';
import { productsMock } from '../mocks';
import { Category } from 'src/modules/inventory/categories/entities/category.entity';
import { ProductCategory } from 'src/modules/inventory/products/entities/product-category.entity';
import { ProductVariant } from 'src/modules/inventory/products/entities/product-variant.entity';
import { Product } from 'src/modules/inventory/products/entities/product.entity';
import { appDataSource } from 'src/database/data-source';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';

const productsToSeed = productsMock;
const images = ["https://res.cloudinary.com/ddhx1kogg/image/upload/v1754159044/LOGO_SE_INSTALA_1_uj4wg0.png"]

@Injectable()
export class ProductSeeder {
    private readonly dataSource: DataSource;
    private readonly logger = new Logger(ProductSeeder.name); // <-- Añadido

    constructor() {
        this.dataSource = appDataSource;
    }

    async run() {
        // Obtenemos el Query Runner para controlar la transacción
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        this.logger.log('Iniciando el seeder de Productos con entidad de unión explícita...');

        // --- CAMBIO: OBTENER TIENDA POR DEFECTO ---
        let defaultStore: Store;
        try {
            defaultStore = await this.dataSource.getRepository(Store).findOneOrFail({ where: {name: 'seinstalashop'} });
        } catch (error) {
            this.logger.error('No se encontró ninguna tienda. Por favor, ejecuta primero el seeder de tiendas.', error.stack);
            await queryRunner.release();
            return;
        }
        // ------------------------------------------

        for (const productData of productsToSeed) {
            await queryRunner.startTransaction(); // Iniciamos una transacción para cada producto
            try {
                const productExists = await queryRunner.manager.findOneBy(Product, { 
                    name: productData.name,
                    store: { id: defaultStore.id } // <-- Cambiado
                });
                if (productExists) {
                    await queryRunner.rollbackTransaction(); // Revertimos la transacción vacía
                    continue;
                }

                // --- 1. Buscar las Categorías ---
                const categoryRepo = queryRunner.manager.getRepository(Category);
                const categoryEntities = await categoryRepo.find({
                    where: { name: In(productData.categories) },
                });

                if (categoryEntities.length !== productData.categories.length) {
                    this.logger.warn(`Alerta: No se encontraron todas las categorías para "${productData.name}". Verifique que existan.`);
                }
                
                const newProduct = new Product();
                newProduct.name = productData.name;
                newProduct.description = productData.description!;
                newProduct.store = defaultStore; // <-- CAMBIO: Asignar la tienda
                newProduct.variants = productData.variants.map(vData => {
                    const variant = new ProductVariant();
                    variant.listPrice = vData.listPrice as number;
                    variant.stock = vData.stock as number ?? 999;
                    variant.isDefault = vData.isDefault as boolean ?? false ;
                    variant.optionName = vData.optionName as string;
                    variant.optionValue = vData.optionValue as string;
                    variant.images = vData.images as string[] ?? images
                    return variant;
                });
                
                const savedProduct = await queryRunner.manager.save(newProduct);

                const productCategoryRepo = queryRunner.manager.getRepository(ProductCategory);
                const relationsToCreate = categoryEntities.map(categoryEntity => {
                    return productCategoryRepo.create({
                        product: savedProduct,
                        category: categoryEntity,
                    });
                });
                
                await productCategoryRepo.save(relationsToCreate);

                // Si todo fue bien, confirmamos la transacción
                await queryRunner.commitTransaction();

            } catch (err) {
                // Si algo falla, revertimos todos los cambios de este producto
                this.logger.error(`Error al crear el producto "${productData.name}". Revirtiendo cambios.`, err.stack);
                await queryRunner.rollbackTransaction();
            }
        }
        await queryRunner.release();
        this.logger.log('Seeder de Productos finalizado.');
    }
}