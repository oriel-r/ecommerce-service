import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Category } from 'src/modules/inventory/categories/entities/category.entity';
import { UnprocessableEntityException } from '@nestjs/common';
import { CategoryService } from 'src/modules/inventory/categories/category.service';
import { StoresService } from 'src/modules/_platform/stores/stores.service';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';

const categoriesMock = {
    Herramientas: ['Espatulas', 'Pinzas', 'Accesorios', 'Otros', 'Cutters y filos', 'Scrapers', 'Buffers y fundas'],
    Consumibles: ['Pegamentos', 'Cintas', 'Guantes', 'Vonixx']
};

type CategorySeedItem = { name: string; parentName?: string };

@Injectable()
export class CategorySeeder {
    private readonly logger = new Logger(CategorySeeder.name);

    constructor(
        private readonly categoriesService: CategoryService,
        private readonly storesService: StoresService,
    ) {}

    async seedBaseCategories() {
        try {
            const defaultStore = await this.storesService.findByDomain('localhost');
            if (!defaultStore) {
                this.logger.error('No se encontró la tienda por defecto. Omitiendo seeding de categorías.');
                return;
            }

            const flattenedCategories = Object.entries(categoriesMock).reduce((acc, [parentName, children]) => {
                acc.push({ name: parentName });
                children.forEach(childName => acc.push({ name: childName, parentName }));
                return acc;
            }, [] as CategorySeedItem[]);

            const parentCategoriesMap = new Map<string, Category>();

            const parentItems = flattenedCategories.filter(item => !item.parentName);
            for (const item of parentItems) {
                await this.createOrFetchCategory(defaultStore, item, parentCategoriesMap);
            }

            const childItems = flattenedCategories.filter(item => item.parentName);
            for (const item of childItems) {
                const parent = parentCategoriesMap.get(item.parentName!);
                if (parent) {
                    await this.createOrFetchCategory(defaultStore, { ...item, parentId: parent.id });
                }
            }
            this.logger.log('Se agregaron las categorías base')
        } catch (error) {
            this.logger.error('Fallo inesperado durante el seeding de categorías:', error.stack);
        }
    }

    private async createOrFetchCategory(
        store: Store,
        item: CategorySeedItem & { parentId?: string },
        map?: Map<string, Category>
    ) {
        try {
            const newCategory = await this.categoriesService.create(store, { name: item.name, parentId: item.parentId });
            if (map && !item.parentName) {
                map.set(item.name, newCategory);
            }
        } catch (error) {
            if (error instanceof UnprocessableEntityException) {
                if (map && !item.parentName) {
                    const existingCategory = await this.categoriesService.getByName(store.id, item.name);
                    if (existingCategory) {
                        map.set(item.name, existingCategory);
                    }
                }
            } else {
                throw error;
            }
        }
    }
}