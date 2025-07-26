import { Injectable, Logger } from "@nestjs/common";
import { CategoryService } from "src/modules/inventory/categories/category.service";
import { ProductService } from "src/modules/inventory/products/product.service";
import { ProductMock, productsMock } from "../mocks";
import { StoresService } from "src/modules/_platform/stores/stores.service";
import { Store } from "src/modules/_platform/stores/entities/store.entity";

@Injectable()
export class ProductsSeeder {

    private logger = new Logger(ProductsSeeder.name)

    constructor(
        private readonly productService: ProductService,
        private readonly categoryService: CategoryService,
        private readonly storeService: StoresService
    ) {}

    async seedProducts() {
        
        const store = await this.storeService.findByDomain('localhost')

        if(!store) {
            this.logger.log('No se encontro la tienda por defecto')
            return
        } else {
            try {
                for (const product of productsMock) {
                        await this.createProduct(product, store)
                    }
                this.logger.log('Productos de muestra añadidos')    
            } catch(error) {
                this.logger.warn('Error desconocido al agregar productos', error)
                return
            }
        }
    return

    }

    private async createProduct(data: ProductMock, store: Store ) {
        const { variants, name, categories, ...others } = data

        const categoriesToAssign = await Promise.all(
            categories.map(name => this.categoryService.getByName(store.id, name))
        )
        const product = await this.productService.create(store, {
            ...others,
            name
        })
        const categoriesIds = categoriesToAssign.map(category => category.id)

        const variantPromises = variants.map(
            variant => this.productService.createProductVariant(store.id, product.id, {
                optionName: variant.optionName!,
                optionValue: variant.optionValue!,
                price: variant.price!
            })
        )

        await Promise.all(variantPromises)

        await this.productService.assignCategoryToProduct(
            {categoriesIds: categoriesIds},
            product.id,
            store.id
        )

        return
    }
}