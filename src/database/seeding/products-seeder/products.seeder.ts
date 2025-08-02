// Archivo: src/database/seeding/products.seeder.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { productsMock } from '../mocks';
import { Category } from 'src/modules/inventory/categories/entities/category.entity';
import { ProductCategory } from 'src/modules/inventory/products/entities/product-category.entity';
import { ProductVariant } from 'src/modules/inventory/products/entities/product-variant.entity';
import { Product } from 'src/modules/inventory/products/entities/product.entity';

const productsToSeed = productsMock;
const images = ["https://res.cloudinary.com/ddhx1kogg/image/upload/v1754159044/LOGO_SE_INSTALA_1_uj4wg0.png"]

@Injectable()
export class ProductSeeder {
    constructor(
        private readonly dataSource: DataSource, // Inyectamos el DataSource para manejar transacciones
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async run() {
        // Obtenemos el Query Runner para controlar la transacción
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        console.log('Iniciando el seeder de Productos con entidad de unión explícita...');

        for (const productData of productsToSeed) {
            await queryRunner.startTransaction(); // Iniciamos una transacción para cada producto
            try {
                const productExists = await queryRunner.manager.findOneBy(Product, { name: productData.name });
                if (productExists) {
                    console.log(`Producto "${productData.name}" ya existe, saltando.`);
                    await queryRunner.rollbackTransaction(); // Revertimos la transacción vacía
                    continue;
                }

                // --- 1. Buscar las Categorías ---
                const categoryRepo = queryRunner.manager.getRepository(Category);
                const categoryEntities = await categoryRepo.find({
                    where: { name: In(productData.categories) },
                });

                if (categoryEntities.length !== productData.categories.length) {
                    console.warn(`Alerta: No se encontraron todas las categorías para "${productData.name}". Verifique que existan.`);
                }
                
                // --- 2. Crear el Producto y sus Variantes (aún sin las categorías) ---
                const newProduct = new Product();
                newProduct.name = productData.name;
                newProduct.description = productData.description!;
                newProduct.variants = productData.variants.map(vData => {
                    const variant = new ProductVariant();
                    variant.price = vData.price;
                    variant.stock = vData.stock ?? 999;
                    variant.isDefault = vData.isDefault ?? false;
                    variant.optionName = vData.optionName;
                    variant.optionValue = vData.optionValue;
                    variant.images = images
                    return variant;
                });
                
                // Guardamos el producto y sus variantes primero. La cascada se encargará de las variantes.
                const savedProduct = await queryRunner.manager.save(newProduct);

                // --- 3. Crear las Relaciones en la Tabla Intermedia ---
                const productCategoryRepo = queryRunner.manager.getRepository(ProductCategory);
                const relationsToCreate = categoryEntities.map(categoryEntity => {
                    return productCategoryRepo.create({
                        product: savedProduct,
                        category: categoryEntity,
                    });
                });
                
                // Guardamos todas las relaciones
                await productCategoryRepo.save(relationsToCreate);

                // Si todo fue bien, confirmamos la transacción
                await queryRunner.commitTransaction();
                console.log(`Producto "${savedProduct.name}" y sus relaciones creados exitosamente.`);

            } catch (err) {
                // Si algo falla, revertimos todos los cambios de este producto
                console.error(`Error al crear el producto "${productData.name}". Revirtiendo cambios.`, err);
                await queryRunner.rollbackTransaction();
            }
        }
        // Liberamos el query runner al final
        await queryRunner.release();
        console.log('Seeder de Productos finalizado.');
    }
}