import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PlatformUserSeeder } from "./platform-seeder/platform-user.seeder";
import { StoreSeeder } from "./store-seeder/store.seeder";
import { CategorySeeder } from "./category-seeder/category.seeder";
import { ConfigService } from "@nestjs/config";
import { ProductsSeeder } from "./products-seeder/products.seeder";

@Injectable()
export class SeederService implements OnModuleInit {
    
    private logger = new Logger('SeederService');

    constructor(
        private readonly configService: ConfigService,
        private readonly platformUserSeeder: PlatformUserSeeder,
        private readonly storeSeeder: StoreSeeder, 
        private readonly categoriesSeeder: CategorySeeder,
        private readonly productSeeder: ProductsSeeder
    ) {}

    async onModuleInit() {
        this.logger.warn('Iniciando proceso de seeding...')
         await this.platformUserSeeder.seedAdminUser() 
         await this.storeSeeder.seedDefaultStore() 
         await this.categoriesSeeder.seedBaseCategories()
         await this.productSeeder.seedProducts() 
        this.logger.warn('Seeding finalizado')
    }
}