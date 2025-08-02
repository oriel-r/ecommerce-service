import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Category } from 'src/modules/inventory/categories/entities/category.entity'; // Asegúrate que la ruta sea correcta
import { Store } from 'src/modules/_platform/stores/entities/store.entity'; // Asegúrate que la ruta sea correcta
import { categoriesMock, defaultStoreMock } from '../mocks'; // Ajusta la ruta a tu archivo de mocks
import { appDataSource } from 'src/database/data-source';

@Injectable()
export class CategorySeeder {
    private readonly logger = new Logger(CategorySeeder.name);
    private readonly dataSource: DataSource;

    constructor() {
        this.dataSource = appDataSource;
    }

    async run() {
        this.logger.log('Iniciando el seeder de Categorías...');

        const categoryRepository = this.dataSource.getRepository(Category);
        const storeRepository = this.dataSource.getRepository(Store);

        const defaultStore = await storeRepository.findOneBy({ 
            domain: defaultStoreMock.domain 
        });

        if (!defaultStore) {
            this.logger.error(`Error crítico: La tienda por defecto con dominio '${defaultStoreMock.domain}' no fue encontrada.`);
            this.logger.error('Asegúrese de que el seeder de Store se ejecute antes que este seeder.');
            return;
        }

        this.logger.log(`Tienda encontrada (ID: ${defaultStore.id}). Procediendo a sembrar categorías...`);

        const parentCategoriesMap = new Map<string, Category>();

        for (const [parentName, childrenNames] of Object.entries(categoriesMock)) {
            
            let parentCategory = await categoryRepository.findOne({
                where: { name: parentName, store: { id: defaultStore.id } }
            });

            if (parentCategory) {
                this.logger.log(`La categoría padre '${parentName}' ya existe. Usando la existente.`);
            } else {
                this.logger.log(`Creando categoría padre: '${parentName}'...`);
                parentCategory = categoryRepository.create({
                    name: parentName,
                    store: defaultStore,
                    parent: null, // Los padres no tienen padre
                });
                await categoryRepository.save(parentCategory);
                this.logger.log(`Categoría padre '${parentName}' creada.`);
            }
            
            parentCategoriesMap.set(parentName, parentCategory);

            
            for (const childName of childrenNames) {
                let childCategory = await categoryRepository.findOne({
                    where: { name: childName, store: { id: defaultStore.id } }
                });

                if (childCategory) {
                    this.logger.log(`La categoría hija '${childName}' ya existe. Omitiendo creación.`);
                } else {
                    this.logger.log(`Creando categoría hija '${childName}' para el padre '${parentName}'...`);
                    childCategory = categoryRepository.create({
                        name: childName,
                        store: defaultStore,
                        parent: parentCategory, // Asignar el padre
                    });
                    await categoryRepository.save(childCategory);
                    this.logger.log(`Categoría hija '${childName}' creada.`);
                }
            }
        }

        this.logger.log('Seeding de categorías base completado.');
    }
}